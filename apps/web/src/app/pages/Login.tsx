import { FormEvent, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refresh } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      await refresh();
      const redirectTo = (location.state as { from?: string } | null)?.from ?? '/';
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  const startOauth = async (provider: 'google' | 'slack') => {
    try {
      const data = await apiRequest<{ url: string }>(`/auth/oauth/${provider}/start`);
      window.location.href = data.url;
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Cannot start oauth login'
      );
    }
  };

  const forgotPassword = async () => {
    setForgotMessage(null);
    try {
      const data = await apiRequest<{ resetToken?: string; ok: boolean }>(
        '/auth/forgot-password',
        {
          method: 'POST',
          body: { email },
        }
      );
      setForgotMessage(
        data.resetToken
          ? `Reset token (dev): ${data.resetToken}`
          : 'If this email exists, reset instructions were generated.'
      );
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Cannot trigger forgot password'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          Sign in with email/password, Google, or Slack.
        </p>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full rounded-md border border-slate-300 px-3 py-2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full rounded-md bg-blue-600 px-3 py-2 text-white disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-3 flex gap-2">
          <button
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            onClick={() => void startOauth('google')}
            type="button"
          >
            Google OAuth
          </button>
          <button
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            onClick={() => void startOauth('slack')}
            type="button"
          >
            Slack OAuth
          </button>
        </div>

        <button
          className="mt-3 text-sm text-blue-700"
          onClick={() => void forgotPassword()}
          type="button"
        >
          Forgot password
        </button>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        {forgotMessage ? (
          <p className="mt-3 text-xs text-slate-600">{forgotMessage}</p>
        ) : null}

        <p className="mt-5 text-sm text-slate-600">
          New here? <Link to="/register" className="text-blue-700">Create account</Link>
        </p>
      </div>
    </div>
  );
}

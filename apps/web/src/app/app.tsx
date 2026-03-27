
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { GlobalShell } from './components/layout/shell/GlobalShell';

import Dashboard from './pages/Dashboard';
import AdminOverview from './pages/AdminOverview';
import SendKudos from './pages/SendKudos';
import Notifications from './pages/Notifications';
import KudoFeed from './pages/KudoFeed';
import RewardsCatalog from './pages/RewardsCatalog';
import MyWallet from './pages/MyWallet';

function Home() {
  // Mock role conditional rendering
  const isAdmin = new URLSearchParams(window.location.search).get('role') === 'admin';
  return isAdmin ? <AdminOverview /> : <Dashboard />;
}

export function App() {
  return (
    <Routes>
      <Route element={<GlobalShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/send-kudos" element={<SendKudos />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/feed" element={<KudoFeed />} />
        <Route path="/rewards" element={<RewardsCatalog />} />
        <Route path="/wallet" element={<MyWallet />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;

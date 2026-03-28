import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { GlobalShell } from './components/layout/shell/GlobalShell';
import { ProtectedRoute, PublicRoute } from './components/common/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import SendKudos from './pages/SendKudos';
import Notifications from './pages/Notifications';
import KudoFeed from './pages/KudoFeed';
import RewardsCatalog from './pages/RewardsCatalog';
import MyWallet from './pages/MyWallet';

export function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<GlobalShell />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/send-kudos" element={<SendKudos />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/feed" element={<KudoFeed />} />
          <Route path="/rewards" element={<RewardsCatalog />} />
          <Route path="/wallet" element={<MyWallet />} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Campaign from './pages/Campaign';
import Login from './pages/Login';

function App() {
  // Temporary auth check - replace with actual auth logic
  // const isAuthenticated = true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/campaign" replace />} />
          <Route path="campaign" element={<Campaign />} />
          <Route path="settings" element={<div className="p-6">Settings (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

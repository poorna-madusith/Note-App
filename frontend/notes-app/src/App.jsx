import React from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const routes = (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
);

const App = () => {
  return <div>{routes}</div>
}

export default App

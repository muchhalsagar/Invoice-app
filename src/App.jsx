import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import Home from './Components/home';
import NotFound from './Components/NotFound';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isLoggedIn = localStorage.getItem('adminToken');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {isLoggedIn ? (
          <Route path="/home" element={<Home />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

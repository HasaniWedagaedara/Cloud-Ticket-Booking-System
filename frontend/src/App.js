import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';

export default function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <nav>
        <Link to="/">Events</Link> |
        {!auth && <Link to="/login">Login</Link>} |
        {!auth && <Link to="/signup">Signup</Link>}
      </nav>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

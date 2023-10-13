import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './Components/First';
import Detail from './Pages/Detail';
import Contact from './Pages/Contact';
import Add from './Pages/Add';
import Edit from './Pages/Edit';
import Notfound from './Pages/NotFound';
import Login from './Login/Login';
import Logout from './Login/Logout';
import LupaPassword from './Login/LupaPassword';
import Reset from './Login/Reset';
import Ganti from './Login/Ganti';
import Registrasi from './Login/Registrasi';
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from './AuthContext';


import './style.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuthenticatedLocal = localStorage.getItem("authenticatedUser") !== null;
    setIsAuthenticated(isAuthenticatedLocal);
  }, []); 

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/LupaPassword" element={<LupaPassword />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/" element={ <PrivateRoute isAuthenticated={isAuthenticated}><First /></PrivateRoute> }/>
          <Route path="Ganti" element={ <PrivateRoute isAuthenticated={isAuthenticated}><Ganti /></PrivateRoute> }/>
          <Route path="detail/:index" element={ <PrivateRoute isAuthenticated={isAuthenticated}><Detail /></PrivateRoute> } />
          <Route path="contact" element={<PrivateRoute isAuthenticated={isAuthenticated}><Contact /></PrivateRoute> } />
          <Route path="add" element={<PrivateRoute isAuthenticated={isAuthenticated}><Add /></PrivateRoute>} />
          <Route path="edit/:index" element={<PrivateRoute isAuthenticated={isAuthenticated}><Edit /></PrivateRoute>} />
          <Route path="logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

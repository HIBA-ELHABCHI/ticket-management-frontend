import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DashboardPage from './components/DashboardPage';
import './styles.css';
import NewTicketsForm from './components/NewTicketsForm';
import TechnicienPage from './components/TechnicienPage';
import UtilisateurPage from './components/UtilisateurPage';



function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tickets/new" element={<NewTicketsForm />} />
        <Route path="/Technicien" element={<TechnicienPage />} />
        <Route path="/utilisateur" element={<UtilisateurPage />} />

        
        {/* autres routes... */}
        {/* Autres routes */}
      </Routes>
    </Router>
  );
}

export default App;
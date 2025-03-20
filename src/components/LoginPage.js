import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dans une application réelle, vous feriez ici une requête d'authentification
    // Pour cette démo, nous allons simplement naviguer vers le tableau de bord
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-link">← Retour à l'accueil</Link>
      
      <div className="login-container">
        <div className="logo">
          <img src="/logo.png" alt="TechTicket Logo" />
          <h1>TechTicket</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom</label>
            <input 
              type="text" 
              id="nom" 
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Entrez votre nom" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input 
              type="text" 
              id="prenom" 
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Entrez votre prénom" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe" 
              required 
            />
          </div>
          
          <button type="submit" className="login-btn">Connexion</button>
        </form>
        
        <div className="forgot-password">
          <a href="#">Mot de passe oublié?</a>
        </div>
        
        <div className="register-link">
          Vous n'avez pas de compte? <a href="#">S'inscrire</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
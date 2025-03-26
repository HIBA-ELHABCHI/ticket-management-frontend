import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="app-container">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>TechTicket</h1>
            </div>
            <nav>
              <ul>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><a href="#cloud">Cloud</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            <Link to="/login" className="login-btn">Se Connecter</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h2>Gérez vos tickets IT avec facilité</h2>
              <p>Notre système de gestion des tickets informatiques vous permet de suivre, attribuer et résoudre les problèmes IT rapidement et efficacement.</p>
              <Link to="/login" className="login-btn">Commencer</Link>
            </div>
            <div className="hero-image">
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <h2 className="section-title">Fonctionnalités</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎫</div>
                <h3>Gestion des tickets</h3>
                <p>Créez, attribuez et suivez facilement les tickets informatiques depuis une interface intuitive.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h3>Tableau de bord</h3>
                <p>Visualisez les statistiques et les tendances pour une meilleure prise de décision.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔔</div>
                <h3>Notifications</h3>
                <p>Recevez des alertes en temps réel pour les mises à jour de tickets et les nouveaux problèmes.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="cloud" className="cloud-section">
          <div className="container">
            <h2 className="section-title">Solution Cloud</h2>
            <div className="cloud-content">
              <p>Notre solution de gestion de tickets est hébergée dans le cloud, ce qui vous permet d'y accéder n'importe où, n'importe quand, et depuis n'importe quel appareil.</p>
              <img src="/cloud-infrastructure.png" alt="Cloud Infrastructure" />
            </div>
          </div>
        </section>
        

        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input type="text" id="name" placeholder="Votre nom" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Votre email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Votre message"></textarea>
              </div>
              <button className="submit-btn">Envoyer</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>TechTicket</h3>
              <p>Solution professionnelle pour la gestion des tickets informatiques.</p>
            </div>
            <div className="footer-section">
              <h3>Liens rapides</h3>
              <ul>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><a href="#cloud">Cloud</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Légal</h3>
              <ul>
                <li><a href="#">Conditions d'utilisation</a></li>
                <li><a href="#">Politique de confidentialité</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <ul>
                <li>Email: info@techticket.com</li>
                <li>Téléphone: +33 1 23 45 67 89</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 TechTicket. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
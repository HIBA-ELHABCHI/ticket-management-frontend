import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const HelpPage = () => {
  const faqs = [
    {
      question: "Comment créer un nouveau ticket ?",
      answer: "Allez dans la section Tickets et cliquez sur 'Nouveau ticket'."
    },
    {
      question: "Comment modifier mon profil ?",
      answer: "Accédez à votre profil via le menu utilisateur en haut à droite."
    },
    {
      question: "Qui contacter en cas de problème technique ?",
      answer: "Envoyez un email à support@techticket.com"
    }
  ];

  return (
    <div className="dashboard-page">
      <div className="sidebar">
        {/* Sidebar identique */}
      </div>

      <div className="main-content">
        <div className="top-bar">
          {/* Barre supérieure identique */}
        </div>

        <div className="dashboard-content">
          <h1>Centre d'Aide</h1>
          
          <div className="help-sections">
            <div className="help-card">
              <h2>📚 Documentation</h2>
              <p>Consultez notre documentation complète pour toutes les fonctionnalités.</p>
              <button className="help-btn">Accéder à la documentation</button>
            </div>

            <div className="help-card">
              <h2>❓ FAQ</h2>
              <div className="faq-list">
                {faqs.map((faq, index) => (
                  <details key={index} className="faq-item">
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="help-card">
              <h2>📞 Contact</h2>
              <p>Notre équipe est disponible pour vous aider :</p>
              <ul className="contact-list">
                <li>📧 Email : support@techticket.com</li>
                <li>📞 Téléphone : +33 1 23 45 67 89</li>
                <li>🕒 Horaires : 9h-18h du lundi au vendredi</li>
              </ul>
            </div>
          </div>

          <div className="video-tutorials">
            <h2>🎥 Tutoriels Vidéo</h2>
            <div className="video-grid">
              <div className="video-card">
                <div className="video-thumbnail"></div>
                <h3>Créer un ticket</h3>
              </div>
              <div className="video-card">
                <div className="video-thumbnail"></div>
                <h3>Gérer les notifications</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
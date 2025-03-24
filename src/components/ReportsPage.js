import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState('tickets');

  const ticketStats = {
    total: 125,
    new: 24,
    inProgress: 42,
    resolved: 59,
    avgResolutionTime: '2.3 jours'
  };

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
          <h1>Rapports et Statistiques</h1>
          
          <div className="report-tabs">
            <button 
              className={`tab-btn ${activeReport === 'tickets' ? 'active' : ''}`}
              onClick={() => setActiveReport('tickets')}
            >
              Tickets
            </button>
            <button 
              className={`tab-btn ${activeReport === 'performance' ? 'active' : ''}`}
              onClick={() => setActiveReport('performance')}
            >
              Performance
            </button>
            <button 
              className={`tab-btn ${activeReport === 'users' ? 'active' : ''}`}
              onClick={() => setActiveReport('users')}
            >
              Utilisateurs
            </button>
          </div>

          {activeReport === 'tickets' && (
            <div className="report-section">
              <h2>Statistiques des Tickets</h2>
              
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Tickets Totaux</h3>
                  <div className="stat-value">{ticketStats.total}</div>
                </div>
                <div className="stat-card">
                  <h3>Nouveaux Tickets</h3>
                  <div className="stat-value">{ticketStats.new}</div>
                </div>
                <div className="stat-card">
                  <h3>En Cours</h3>
                  <div className="stat-value">{ticketStats.inProgress}</div>
                </div>
                <div className="stat-card">
                  <h3>Résolus</h3>
                  <div className="stat-value">{ticketStats.resolved}</div>
                </div>
              </div>

              <div className="chart-container">
                <h3>Répartition des Tickets</h3>
                <div className="chart-placeholder">
                  {/* Ici vous intégrerez votre bibliothèque de graphiques (Chart.js, etc.) */}
                  <p>[Graphique circulaire des statuts des tickets]</p>
                </div>
              </div>

              <div className="report-actions">
                <button className="export-btn">
                  <span className="icon">📄</span> Exporter en PDF
                </button>
                <button className="export-btn">
                  <span className="icon">📊</span> Exporter en Excel
                </button>
              </div>
            </div>
          )}

          {activeReport === 'performance' && (
            <div className="report-section">
              <h2>Performance du Support</h2>
              <p>Temps moyen de résolution : <strong>{ticketStats.avgResolutionTime}</strong></p>
              {/* Autres métriques de performance */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
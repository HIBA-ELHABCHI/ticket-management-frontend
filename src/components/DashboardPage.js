import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaUsers, FaChartLine, FaCog, FaSignOutAlt, FaSearch, FaBell, FaUserCircle, FaClock, FaCheckCircle, FaInfoCircle, FaPlusCircle, FaUserPlus, FaFileExport } from 'react-icons/fa';
import './dashboard.css';

const DashboardPage = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    averageResponseTime: '0h',
    userCount: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Simuler le chargement des données
    const fetchData = async () => {
      // En production, vous feriez des appels API ici
      const mockTickets = [
        { id: 1, customer: 'Josephine Zimmerman', status: 'in_progress', category: 'Problème technique', date: '14.01.2025', priority: 'high', assignedTo: 'Tech 1' },
        { id: 2, customer: 'Cecilia Harriet', status: 'resolved', category: 'Question facturation', date: '13.01.2025', priority: 'medium', assignedTo: 'Tech 2' },
        { id: 3, customer: 'Dennis Thomas', status: 'closed', category: 'Demande de fonctionnalité', date: '12.01.2025', priority: 'low', assignedTo: 'Tech 3' },
        { id: 4, customer: 'Luza Neal', status: 'in_progress', category: 'Accès compte', date: '11.01.2025', priority: 'high', assignedTo: 'Tech 1' },
        { id: 5, customer: 'Jeff Montgomery', status: 'open', category: 'Question produit', date: '10.01.2025', priority: 'medium', assignedTo: '' }
      ];

      const mockUsers = [
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', lastLogin: '2025-01-14' },
        { id: 2, name: 'Technicien 1', email: 'tech1@example.com', role: 'technician', lastLogin: '2025-01-14' },
        { id: 3, name: 'Technicien 2', email: 'tech2@example.com', role: 'technician', lastLogin: '2025-01-13' },
        { id: 4, name: 'Utilisateur 1', email: 'user1@example.com', role: 'user', lastLogin: '2025-01-12' }
      ];

      setTickets(mockTickets);
      setUsers(mockUsers);
      setStats({
        openTickets: 12,
        inProgressTickets: 8,
        resolvedTickets: 42,
        averageResponseTime: '3.5h',
        userCount: mockUsers.length
      });
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'tickets':
        return <TicketsTab tickets={tickets} />;
      case 'users':
        return <UsersTab users={users} />;
      case 'reports':
        return <ReportsTab stats={stats} />;
      default:
        return <DashboardTab tickets={tickets} stats={stats} />;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="profile">
          <div className="avatar">A</div>
          <div className="profile-info">
            <p className="name">Administrateur</p>
            <p className="role">Admin</p>
          </div>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaTicketAlt className="icon" />
            <span>HelpDesk +</span>
          </button>
          <button 
            className={`nav-link ${activeTab === 'tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('tickets')}
          >
            <FaTicketAlt className="icon" />
            <span>Tickets</span>
          </button>
          <button 
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers className="icon" />
            <span>Utilisateurs</span>
          </button>
          <button 
            className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <FaChartLine className="icon" />
            <span>Rapports</span>
          </button>
          <div className="nav-divider">Administration</div>
          <button className="nav-link">
            <FaCog className="icon" />
            <span>Paramètres</span>
          </button>
          <button className="nav-link logout">
            <FaSignOutAlt className="icon" />
            <span>Déconnexion</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>
            {activeTab === 'dashboard' && 'Tableau de bord'}
            {activeTab === 'tickets' && 'Gestion des tickets'}
            {activeTab === 'users' && 'Gestion des utilisateurs'}
            {activeTab === 'reports' && 'Rapports et statistiques'}
          </h1>
          <div className="header-actions">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Rechercher..." />
            </div>
            <button className="notification-btn">
              <FaBell className="icon" />
              <span className="badge">3</span>
            </button>
            <button className="profile-btn">
              <FaUserCircle className="icon" />
            </button>
          </div>
        </header>

        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Composants pour les différents onglets
const DashboardTab = ({ tickets, stats }) => (
  <>
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <FaTicketAlt className="icon" />
          <span>Tickets ouverts</span>
        </div>
        <div className="stat-value">{stats.openTickets}</div>
        <div className="stat-change positive">↓ 12% vs semaine dernière</div>
      </div>
      <div className="stat-card">
        <div className="stat-header">
          <FaClock className="icon" />
          <span>Temps moyen de réponse</span>
        </div>
        <div className="stat-value">{stats.averageResponseTime}</div>
        <div className="stat-change negative">↑ 10% vs semaine dernière</div>
      </div>
      <div className="stat-card">
        <div className="stat-header">
          <FaCheckCircle className="icon" />
          <span>Tickets résolus</span>
        </div>
        <div className="stat-value">{stats.resolvedTickets}</div>
        <div className="stat-change positive">↑ 18% vs semaine dernière</div>
      </div>
      <div className="stat-card">
        <div className="stat-header">
          <FaUsers className="icon" />
          <span>Utilisateurs</span>
        </div>
        <div className="stat-value">{stats.userCount}</div>
        <div className="stat-change neutral">+2 ce mois-ci</div>
      </div>
    </div>

    <div className="content-grid">
      <div className="tickets-container">
        <h2 className="section-title">Derniers tickets</h2>
        <div className="table-container">
          <table className="tickets-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Statut</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Assigné à</th>
                <th>Priorité</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.customer}</td>
                  <td>
                    <span className={`status-badge ${ticket.status}`}>
                      {ticket.status === 'in_progress' ? 'En cours' : 
                       ticket.status === 'resolved' ? 'Résolu' : 
                       ticket.status === 'closed' ? 'Fermé' : 'Ouvert'}
                    </span>
                  </td>
                  <td>{ticket.category}</td>
                  <td>{ticket.date}</td>
                  <td>{ticket.assignedTo || 'Non assigné'}</td>
                  <td>
                    <span className={`priority ${ticket.priority}`}>
                      {ticket.priority === 'high' ? 'Haute' : 
                       ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="quick-actions">
        <div className="action-card">
          <div className="action-header">
            <span>Actions rapides</span>
            <FaInfoCircle className="icon" />
          </div>
          <button className="action-btn primary">
            <FaPlusCircle className="icon" />
            <span>Créer un ticket</span>
          </button>
          <button className="action-btn primary">
            <FaUserPlus className="icon" />
            <span>Ajouter un utilisateur</span>
          </button>
          <button className="action-btn secondary">
            <FaFileExport className="icon" />
            <span>Exporter un rapport</span>
          </button>
        </div>
      </div>
    </div>
  </>
);

const TicketsTab = ({ tickets }) => (
  <div className="full-width-container">
    <h2 className="section-title">Tous les tickets</h2>
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Statut</th>
            <th>Catégorie</th>
            <th>Date création</th>
            <th>Assigné à</th>
            <th>Priorité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>#{ticket.id}</td>
              <td>{ticket.customer}</td>
              <td>
                <span className={`status-badge ${ticket.status}`}>
                  {ticket.status === 'in_progress' ? 'En cours' : 
                   ticket.status === 'resolved' ? 'Résolu' : 
                   ticket.status === 'closed' ? 'Fermé' : 'Ouvert'}
                </span>
              </td>
              <td>{ticket.category}</td>
              <td>{ticket.date}</td>
              <td>{ticket.assignedTo || 'Non assigné'}</td>
              <td>
                <span className={`priority ${ticket.priority}`}>
                  {ticket.priority === 'high' ? 'Haute' : 
                   ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                </span>
              </td>
              <td>
                <button className="table-action">Voir</button>
                <button className="table-action">Éditer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const UsersTab = ({ users }) => (
  <div className="full-width-container">
    <div className="section-header">
      <h2 className="section-title">Gestion des utilisateurs</h2>
      <button className="primary-btn">
        <FaUserPlus className="icon" />
        <span>Ajouter un utilisateur</span>
      </button>
    </div>
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Dernière connexion</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.role}`}>
                  {user.role === 'admin' ? 'Administrateur' : 
                   user.role === 'technician' ? 'Technicien' : 'Utilisateur'}
                </span>
              </td>
              <td>{user.lastLogin}</td>
              <td>
                <button className="table-action">Éditer</button>
                <button className="table-action danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ReportsTab = ({ stats }) => (
  <div className="reports-container">
    <h2 className="section-title">Rapports et statistiques</h2>
    
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Tickets par statut</h3>
        <div className="chart-placeholder">Graphique circulaire</div>
      </div>
      <div className="chart-card">
        <h3>Tickets par catégorie</h3>
        <div className="chart-placeholder">Graphique à barres</div>
      </div>
      <div className="chart-card">
        <h3>Tickets par priorité</h3>
        <div className="chart-placeholder">Graphique à barres</div>
      </div>
      <div className="chart-card">
        <h3>Temps de résolution moyen</h3>
        <div className="chart-placeholder">Graphique linéaire</div>
      </div>
    </div>
    
    <div className="export-section">
      <h3>Exporter des données</h3>
      <div className="export-options">
        <button className="export-btn">
          <FaFileExport className="icon" />
          <span>Tickets (CSV)</span>
        </button>
        <button className="export-btn">
          <FaFileExport className="icon" />
          <span>Utilisateurs (CSV)</span>
        </button>
        <button className="export-btn">
          <FaFileExport className="icon" />
          <span>Statistiques (PDF)</span>
        </button>
      </div>
    </div>
  </div>
);

export default DashboardPage;
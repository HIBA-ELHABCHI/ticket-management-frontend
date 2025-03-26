import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
const DashboardPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [sortField, setSortField] = useState('created');
  const [sortDirection, setSortDirection] = useState('desc');
  const navigate = useNavigate();

  // Nouvelles données fictives pour les tickets
   const tickets = [
    { id: 'TK-101', title: 'Problème accès VPN', status: 'new', priority: 'high', assignee: 'Martin Dupont', created: '2025-03-22', department: 'Sécurité', lastUpdated: '2025-03-22' },
    { id: 'TK-102', title: 'Mise à jour Windows échouée', status: 'in-progress', priority: 'medium', assignee: 'Julie Martin', created: '2025-03-21', department: 'IT', lastUpdated: '2025-03-22' },
    { id: 'TK-103', title: 'Configuration email sur mobile', status: 'new', priority: 'low', assignee: 'Non assigné', created: '2025-03-20', department: 'Support', lastUpdated: '2025-03-20' },
    { id: 'TK-104', title: 'Problème d\'impression réseau', status: 'in-progress', priority: 'high', assignee: 'Martin Dupont', created: '2025-03-19', department: 'IT', lastUpdated: '2025-03-21' },
    { id: 'TK-105', title: 'Installation logiciel comptabilité', status: 'resolved', priority: 'medium', assignee: 'Paul Durand', created: '2025-03-18', department: 'Finance', lastUpdated: '2025-03-20' },
  ];

  // Récupérer les tâches assignées à l'utilisateur connecté
  const userTasks = tickets.filter(ticket => ticket.assignee === 'Martin Dupont');

  // Filtrer et trier les tickets
  const filteredTickets = tickets
    .filter(ticket => {
      // Filtrer par statut
      if (activeFilter !== 'all' && ticket.status !== activeFilter) return false;
      
      // Filtrer par recherche
      if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !ticket.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Trier par champ
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Convertir les dates en objets Date pour comparaison
      if (sortField === 'created' || sortField === 'lastUpdated') {
        aValue = new Date(a[sortField]);
        bValue = new Date(b[sortField]);
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

  // Gérer la création d'un nouveau ticket
  const handleNewTicket = () => {
    navigate('/tickets/new');
  };

  // Gérer l'ouverture de la vue rapide d'un ticket
  const handleQuickView = (ticket) => {
    setSelectedTicket(ticket);
    setIsQuickViewOpen(true);
  };

  // Gérer la fermeture de la vue rapide
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // Gérer l'assignation d'un ticket
  const handleAssignTicket = (ticketId) => {
    alert(`Ticket ${ticketId} assigné à vous-même`);
    // Logique d'assignation à implémenter
  };

  // Gérer le changement de statut d'un ticket
  const handleStatusChange = (ticketId, newStatus) => {
    alert(`Statut du ticket ${ticketId} changé en ${newStatus}`);
    // Logique de changement de statut à implémenter
  };

  // Gérer le rappel d'un ticket
  const handleRemindTicket = (ticketId) => {
    alert(`Un rappel a été programmé pour le ticket ${ticketId}`);
    // Logique de rappel à implémenter
  };

  // Gérer la fermeture d'un ticket
  const handleCloseTicket = (ticketId) => {
    if (window.confirm(`Êtes-vous sûr de vouloir fermer le ticket ${ticketId} ?`)) {
      alert(`Le ticket ${ticketId} a été fermé avec succès`);
      // Logique de fermeture à implémenter
    }
  };

  // Gérer le tri des tickets
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Rafraîchir les données périodiquement (simulation)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simuler une mise à jour des données
      console.log('Actualisation des données...');
    }, 60000); // Toutes les minutes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-page">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="/image/ticket.png" alt="TechTicket Logo" />
          <h2>TechTicket</h2>
        </div>
        <div className="sidebar-menu">
          <Link to="/dashboard" className="menu-item active">
            <span className="icon">📊</span> Tableau de bord
          </Link>
          <Link to="/tickets/new" className="menu-item">
            <span className="icon">🎫</span> Tickets
          </Link>
          <Link to="/users" className="menu-item">
            <span className="icon">👥</span> Utilisateurs
          </Link>
          <Link to="/settings" className="menu-item">
            <span className="icon">⚙️</span> Paramètres
          </Link>
          <Link to="/reports" className="menu-item">
            <span className="icon">📈</span> Rapports
          </Link>
          <Link to="/notifications" className="menu-item">
            <span className="icon">🔔</span> 
            Notifications
            {notifications > 0 && <span className="badge">{notifications}</span>}
          </Link>
          <Link to="/help" className="menu-item">
            <span className="icon">❓</span> Aide
          </Link>
          <Link to="/" className="menu-item logout">
            <span className="icon">🚪</span> Déconnexion
          </Link>
        </div>
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
            <h1>Tableau de bord</h1>
          </div>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Rechercher des tickets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="user-info">
            <div className="notification-icon" onClick={() => navigate('/notifications')}>
              🔔
              {notifications > 0 && <span className="badge">{notifications}</span>}
            </div>
           
          </div>
        </div>

        <div className="dashboard-content">
          <div className="stats-container">
            <div className="stat-card">
              <h3>Total des tickets</h3>
              <div className="stat-value">{tickets.length}</div>
              <div className="stat-trend">+2 depuis hier</div>
            </div>
            <div className="stat-card">
              <h3>Nouveaux tickets</h3>
              <div className="stat-value">{tickets.filter(t => t.status === 'new').length}</div>
              <div className="stat-trend">+1 depuis hier</div>
            </div>
            <div className="stat-card">
              <h3>En cours</h3>
              <div className="stat-value">{tickets.filter(t => t.status === 'in-progress').length}</div>
              <div className="stat-trend">Stable</div>
            </div>
            <div className="stat-card">
              <h3>Résolus</h3>
              <div className="stat-value">{tickets.filter(t => t.status === 'resolved').length}</div>
              <div className="stat-trend">+1 depuis hier</div>
            </div>
          </div>

         

          <div className="my-tasks">
            <h2>Mes tâches ({userTasks.length})</h2>
            <div className="task-list">
              {userTasks.map(task => (
                <div key={task.id} className="task-item">
                  <div className="task-header">
                    <span className={`priority-indicator priority-${task.priority}`}></span>
                    <span className="task-id">{task.id}</span>
                    <span className={`status-badge status-${task.status}`}>
                      {task.status === 'new' && 'Nouveau'}
                      {task.status === 'in-progress' && 'En cours'}
                      {task.status === 'resolved' && 'Résolu'}
                    </span>
                  </div>
                  <div className="task-title">{task.title}</div>
                  <div className="task-footer">
                    <span className="task-date">Créé le {new Date(task.created).toLocaleDateString('fr-FR')}</span>
                    <div className="task-actions">
                      <button onClick={() => navigate(`/tickets/${task.id}`)}>Voir</button>
                      <button onClick={() => handleQuickView(task)}>Aperçu</button>
                    </div>
                  </div>
                </div>
              ))}
              {userTasks.length === 0 && <p>Aucune tâche assignée</p>}
            </div>
          </div>

          <div className="ticket-list">
            <div className="list-header">
              <h2>Liste des tickets</h2>
              <div className="header-actions">
                <button className="refresh-btn" title="Actualiser">🔄</button>
                <button className="new-ticket-btn" onClick={handleNewTicket}>
                  <span className="icon">➕</span> Nouveau ticket
                </button>
              </div>
            </div>

            <div className="filter-options">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                Tous
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`}
                onClick={() => setActiveFilter('new')}
              >
                Nouveaux
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'in-progress' ? 'active' : ''}`}
                onClick={() => setActiveFilter('in-progress')}
              >
                En cours
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'resolved' ? 'active' : ''}`}
                onClick={() => setActiveFilter('resolved')}
              >
                Résolus
              </button>
              <div className="search-box">
                <input 
                  type="text" 
                  placeholder="Filtre rapide..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select className="department-filter">
                <option value="">Tous les départements</option>
                <option value="IT">IT</option>
                <option value="Support">Support</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Sécurité">Sécurité</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className={sortField === 'id' ? `sort-${sortDirection}` : ''}>
                    ID {sortField === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('title')} className={sortField === 'title' ? `sort-${sortDirection}` : ''}>
                    Titre {sortField === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('status')} className={sortField === 'status' ? `sort-${sortDirection}` : ''}>
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('priority')} className={sortField === 'priority' ? `sort-${sortDirection}` : ''}>
                    Priorité {sortField === 'priority' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('assignee')} className={sortField === 'assignee' ? `sort-${sortDirection}` : ''}>
                    Assigné à {sortField === 'assignee' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th onClick={() => handleSort('created')} className={sortField === 'created' ? `sort-${sortDirection}` : ''}>
                    Date de création {sortField === 'created' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map(ticket => (
                  <tr key={ticket.id} className={ticket.priority === 'high' ? 'high-priority' : ''}>
                    <td className="ticket-id">{ticket.id}</td>
                    <td>{ticket.title}</td>
                    <td>
                      <span className={`status-badge status-${ticket.status}`}>
                        {ticket.status === 'new' && 'Nouveau'}
                        {ticket.status === 'in-progress' && 'En cours'}
                        {ticket.status === 'resolved' && 'Résolu'}
                        {ticket.status === 'closed' && 'Fermé'}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge priority-${ticket.priority}`}>
                        {ticket.priority === 'high' ? 'Haute' : ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                    </td>
                    <td>{ticket.assignee}</td>
                    <td>{new Date(ticket.created).toLocaleDateString('fr-FR')}</td>
                    <td className="actions">
                    
                      <button onClick={() => handleRemindTicket(ticket.id)} title="Programmer un rappel">⏰</button>
                      <button onClick={() => handleCloseTicket(ticket.id)} title="Fermer le ticket">✅</button>
                      <div className="dropdown">
                        <button className="dropdown-btn">⋮</button>
                        <div className="dropdown-content">
                          <button onClick={() => navigate(`/tickets/${ticket.id}/edit`)}>Modifier</button>
                          <button onClick={() => handleAssignTicket(ticket.id)}>M'assigner</button>
                          <button onClick={() => handleStatusChange(ticket.id, 'in-progress')}>Marquer en cours</button>
                          <button onClick={() => handleStatusChange(ticket.id, 'resolved')}>Marquer résolu</button>
                          <button onClick={() => navigate(`/tickets/${ticket.id}/history`)}>Historique</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan="7" className="no-records">Aucun ticket trouvé</td>
                  </tr>
                )}
              </tbody>
            </table>
            
            <div className="pagination">
              <button disabled>&lt;&lt;</button>
              <button disabled>&lt;</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>&gt;</button>
              <button>&gt;&gt;</button>
              <span className="page-info">Page 1 sur 3</span>
            </div>
          </div>
        </div>
      </div>

      {isQuickViewOpen && selectedTicket && (
        <div className="quick-view-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Aperçu rapide - {selectedTicket.id}</h3>
              <button className="close-btn" onClick={handleCloseQuickView}>×</button>
            </div>
            <div className="modal-body">
              <div className="ticket-details">
                <h4>{selectedTicket.title}</h4>
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className={`status-badge status-${selectedTicket.status}`}>
                    {selectedTicket.status === 'new' && 'Nouveau'}
                    {selectedTicket.status === 'in-progress' && 'En cours'}
                    {selectedTicket.status === 'resolved' && 'Résolu'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Priorité:</span>
                  <span className={`priority-badge priority-${selectedTicket.priority}`}>
                    {selectedTicket.priority === 'high' ? 'Haute' : selectedTicket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Assigné à:</span>
                  <span>{selectedTicket.assignee}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Département:</span>
                  <span>{selectedTicket.department}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date de création:</span>
                  <span>{new Date(selectedTicket.created).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Dernière mise à jour:</span>
                  <span>{new Date(selectedTicket.lastUpdated).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <div className="quick-actions">
                <button onClick={() => navigate(`/tickets/${selectedTicket.id}`)}>Voir complet</button>
                <button onClick={() => handleStatusChange(selectedTicket.id, 'in-progress')}>Marquer en cours</button>
                <button onClick={() => handleStatusChange(selectedTicket.id, 'resolved')}>Marquer résolu</button>
                <button onClick={() => handleRemindTicket(selectedTicket.id)}>Rappeler</button>
                <button onClick={() => handleCloseTicket(selectedTicket.id)}>Fermer</button>
                {selectedTicket.assignee === 'Non assigné' && (
                  <button onClick={() => handleAssignTicket(selectedTicket.id)}>M'assigner</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
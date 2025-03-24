import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './notifications.css';

const NotificationsPage = () => {
  // Données fictives pour les notifications
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'ticket_assigned', 
      title: 'Nouveau ticket assigné', 
      content: 'Le ticket TK-101 "Problème accès VPN" vous a été assigné.', 
      ticketId: 'TK-101',
      date: '2025-03-23T09:14:00', 
      read: false 
    },
    { 
      id: 2, 
      type: 'ticket_update', 
      title: 'Ticket mis à jour', 
      content: 'Julie Martin a commenté sur le ticket TK-102 "Mise à jour Windows échouée".', 
      ticketId: 'TK-102',
      date: '2025-03-22T15:32:00', 
      read: false 
    },
    { 
      id: 3, 
      type: 'task_reminder', 
      title: 'Rappel de tâche', 
      content: 'Rappel: Le ticket TK-104 "Problème d\'impression réseau" doit être résolu aujourd\'hui.', 
      ticketId: 'TK-104',
      date: '2025-03-22T08:00:00', 
      read: false 
    },
    { 
      id: 4, 
      type: 'ticket_closed', 
      title: 'Ticket fermé', 
      content: 'Le ticket TK-098 "Installation logiciel marketing" a été fermé par Paul Durand.', 
      ticketId: 'TK-098',
      date: '2025-03-21T16:45:00', 
      read: true 
    },
    { 
      id: 5, 
      type: 'system_notification', 
      title: 'Maintenance système prévue', 
      content: 'Une maintenance système est prévue le 25/03/2025 de 22h à 00h. Le système pourrait être indisponible pendant cette période.', 
      date: '2025-03-21T10:30:00', 
      read: true 
    },
    { 
      id: 6, 
      type: 'ticket_priority', 
      title: 'Changement de priorité', 
      content: 'La priorité du ticket TK-100 "Mise à jour serveur mail" a été changée de Moyenne à Haute.', 
      ticketId: 'TK-100',
      date: '2025-03-20T14:12:00', 
      read: true 
    },
    { 
      id: 7, 
      type: 'user_mention', 
      title: 'Mention dans un commentaire', 
      content: 'Vous avez été mentionné dans un commentaire par Sophie Leclerc sur le ticket TK-103.', 
      ticketId: 'TK-103',
      date: '2025-03-20T11:05:00', 
      read: true 
    }
  ]);

  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Marquer une notification comme lue
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Marquer toutes les notifications comme lues
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  // Supprimer une notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Filtrer les notifications en fonction de l'onglet actif
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'read') return notification.read;
    if (filterType !== 'all') return notification.type === filterType;
    return true;
  });

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `Il y a ${diffMins} minute${diffMins > 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
  };

  // Obtenir l'icône en fonction du type de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'ticket_assigned': return '📋';
      case 'ticket_update': return '📝';
      case 'task_reminder': return '⏰';
      case 'ticket_closed': return '✅';
      case 'system_notification': return '🔧';
      case 'ticket_priority': return '🔴';
      case 'user_mention': return '💬';
      default: return '🔔';
    }
  };

  // Obtenir le nombre de notifications non lues
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="notifications-page">
      <div className="sidebar">
        {/* Sidebar content from dashboard */}
        <div className="sidebar-header">
          <img src="/logo.png" alt="TechTicket Logo" />
          <h2>TechTicket</h2>
        </div>
        <div className="sidebar-menu">
          <Link to="/dashboard" className="menu-item">
            <span className="icon">📊</span> Tableau de bord
          </Link>
          <Link to="/tickets" className="menu-item">
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
          <Link to="/notifications" className="menu-item active">
            <span className="icon">🔔</span> 
            Notifications
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
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
            <h1>Notifications</h1>
          </div>
          <div className="user-info">
            <div className="notification-icon">
              🔔
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>
            <img src="/user-avatar.png" alt="User Avatar" />
            <div className="user-dropdown">
              <span className="user-name">Martin Dupont</span>
              <div className="dropdown-content">
                <Link to="/profile">Mon profil</Link>
                <Link to="/settings">Paramètres</Link>
                <Link to="/">Déconnexion</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="notifications-content">
          <div className="notifications-header">
            <div className="notification-tabs">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} 
                onClick={() => setActiveTab('all')}
              >
                Toutes ({notifications.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'unread' ? 'active' : ''}`} 
                onClick={() => setActiveTab('unread')}
              >
                Non lues ({unreadCount})
              </button>
              <button 
                className={`tab-btn ${activeTab === 'read' ? 'active' : ''}`} 
                onClick={() => setActiveTab('read')}
              >
                Lues ({notifications.length - unreadCount})
              </button>
            </div>
            <div className="notification-actions">
              <button className="action-btn" onClick={markAllAsRead} disabled={unreadCount === 0}>
                Tout marquer comme lu
              </button>
              <select 
                className="filter-dropdown" 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">Tous les types</option>
                <option value="ticket_assigned">Tickets assignés</option>
                <option value="ticket_update">Mises à jour de tickets</option>
                <option value="task_reminder">Rappels</option>
                <option value="ticket_closed">Tickets fermés</option>
                <option value="system_notification">Notifications système</option>
                <option value="ticket_priority">Changements de priorité</option>
                <option value="user_mention">Mentions</option>
              </select>
            </div>
          </div>

          <div className="notifications-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className="notification-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h3 className="notification-title">{notification.title}</h3>
                    <p className="notification-message">{notification.content}</p>
                    <span className="notification-time">{formatDate(notification.date)}</span>
                    {notification.ticketId && (
                      <Link to={`/tickets/${notification.ticketId}`} className="notification-link">
                        Voir le ticket
                      </Link>
                    )}
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="notification-action-btn" 
                        onClick={() => markAsRead(notification.id)}
                        title="Marquer comme lu"
                      >
                        ✓
                      </button>
                    )}
                    <button 
                      className="notification-action-btn" 
                      onClick={() => deleteNotification(notification.id)}
                      title="Supprimer"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <div className="empty-icon">🔔</div>
                <p>Aucune notification {
                  activeTab === 'unread' ? 'non lue' : 
                  activeTab === 'read' ? 'lue' : 
                  filterType !== 'all' ? 'de ce type' : ''
                }</p>
              </div>
            )}
          </div>

          <div className="notification-settings-link">
            <Link to="/settings/notifications">
              <button className="settings-btn">
                Paramètres de notification
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
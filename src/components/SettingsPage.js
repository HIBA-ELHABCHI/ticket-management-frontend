import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './settings.css';

const SettingsPage = () => {
  const [generalSettings, setGeneralSettings] = useState({
    language: 'fr',
    theme: 'light',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    autoRefresh: true,
    refreshInterval: 5
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    browserNotifications: true,
    newTicketAlert: true,
    ticketUpdatedAlert: true,
    ticketAssignedAlert: true,
    ticketResolvedAlert: true,
    dailySummary: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    changePassword: '',
    confirmPassword: ''
  });

  const [activeTab, setActiveTab] = useState('general');

  const handleGeneralSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNotificationSettingsChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleSecuritySettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveSettings = () => {
    alert('Paramètres enregistrés avec succès !');
    // Logique pour sauvegarder les paramètres
  };

  return (
    <div className="settings-page">
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
          <Link to="/settings" className="menu-item active">
            <span className="icon">⚙️</span> Paramètres
          </Link>
          <Link to="/reports" className="menu-item">
            <span className="icon">📈</span> Rapports
          </Link>
          <Link to="/notifications" className="menu-item">
            <span className="icon">🔔</span> 
            Notifications
            <span className="badge">3</span>
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
            <h1>Paramètres</h1>
          </div>
          <div className="user-info">
            <div className="notification-icon">
              🔔
              <span className="badge">3</span>
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

        <div className="settings-content">
          <div className="settings-tabs">
            <button 
              className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              Général
            </button>
            <button 
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Sécurité
            </button>
            <button 
              className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              Compte
            </button>
            <button 
              className={`tab-btn ${activeTab === 'customization' ? 'active' : ''}`}
              onClick={() => setActiveTab('customization')}
            >
              Personnalisation
            </button>
          </div>

          <div className="settings-form">
            {activeTab === 'general' && (
              <div className="tab-content">
                <h2>Paramètres généraux</h2>
                <div className="form-group">
                  <label>Langue</label>
                  <select name="language" value={generalSettings.language} onChange={handleGeneralSettingsChange}>
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Thème</label>
                  <select name="theme" value={generalSettings.theme} onChange={handleGeneralSettingsChange}>
                    <option value="light">Clair</option>
                    <option value="dark">Sombre</option>
                    <option value="system">Système</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Format de date</label>
                  <select name="dateFormat" value={generalSettings.dateFormat} onChange={handleGeneralSettingsChange}>
                    <option value="DD/MM/YYYY">JJ/MM/AAAA</option>
                    <option value="MM/DD/YYYY">MM/JJ/AAAA</option>
                    <option value="YYYY-MM-DD">AAAA-MM-JJ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Format d'heure</label>
                  <select name="timeFormat" value={generalSettings.timeFormat} onChange={handleGeneralSettingsChange}>
                    <option value="24h">24h</option>
                    <option value="12h">12h (AM/PM)</option>
                  </select>
                </div>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="autoRefresh" 
                    name="autoRefresh" 
                    checked={generalSettings.autoRefresh} 
                    onChange={handleGeneralSettingsChange} 
                  />
                  <label htmlFor="autoRefresh">Actualisation automatique</label>
                </div>
                <div className="form-group">
                  <label>Intervalle d'actualisation (minutes)</label>
                  <input 
                    type="number" 
                    name="refreshInterval" 
                    value={generalSettings.refreshInterval} 
                    onChange={handleGeneralSettingsChange}
                    min="1"
                    max="60" 
                  />
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="tab-content">
                <h2>Paramètres de notifications</h2>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="emailNotifications" 
                    name="emailNotifications" 
                    checked={notificationSettings.emailNotifications} 
                    onChange={handleNotificationSettingsChange} 
                  />
                  <label htmlFor="emailNotifications">Notifications par e-mail</label>
                </div>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="browserNotifications" 
                    name="browserNotifications" 
                    checked={notificationSettings.browserNotifications} 
                    onChange={handleNotificationSettingsChange} 
                  />
                  <label htmlFor="browserNotifications">Notifications du navigateur</label>
                </div>
                <h3>M'alerter lorsque :</h3>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="newTicketAlert" 
                    name="newTicketAlert" 
                    checked={notificationSettings.newTicketAlert} 
                    onChange={handleNotificationSettingsChange} 
                  />
                  <label htmlFor="newTicketAlert">Un nouveau ticket est créé</label>
                </div>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="ticketUpdatedAlert" 
                    name="ticketUpdatedAlert" 
                    checked={notificationSettings.ticketUpdatedAlert} 
                    onChange={handleNotificationSettingsChange} 
                  />
                  <label htmlFor="ticketUpdatedAlert">Un ticket est mis à jour</label>
                </div>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="ticketAssignedAlert" 
                    name="ticketAssignedAlert" 
                    checked={notificationSettings.ticketAssignedAlert} 
                    onChange={handleNotificationSettingsChange} 
                  />
                  <label htmlFor="ticketAssignedAlert">Un ticket m'est assigné</label>
                </div>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="ticketResolvedAlert" 
                    name="ticketResolvedAlert" 
                    checked={notificationSettings.ticketResolvedAlert} 
                    onChange={handleNotificationSettingsChange} 
                  />
                  <label htmlFor="ticketResolvedAlert">Un ticket est résolu</label>
                </div>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="dailySummary" 
                    name="dailySummary" 
                    checked={notificationSettings.dailySummary} 
                    onChange={handleNotificationSettingsChange} 
                  />
                  <label htmlFor="dailySummary">Recevoir un résumé quotidien</label>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="tab-content">
                <h2>Paramètres de sécurité</h2>
                <div className="form-group checkbox">
                  <input 
                    type="checkbox" 
                    id="twoFactorAuth" 
                    name="twoFactorAuth" 
                    checked={securitySettings.twoFactorAuth} 
                    onChange={handleSecuritySettingsChange} 
                  />
                  <label htmlFor="twoFactorAuth">Authentification à deux facteurs</label>
                </div>
                {securitySettings.twoFactorAuth && (
                  <div className="secondary-options">
                    <p>L'authentification à deux facteurs est activée. Scannez le QR code ci-dessous avec une application d'authentification :</p>
                    <img src="/qrcode-placeholder.png" alt="QR Code pour 2FA" className="qr-code" />
                    <p>Code de secours : ABCD-EFGH-IJKL-MNOP</p>
                  </div>
                )}
                <div className="form-group">
                  <label>Délai d'expiration de session (minutes)</label>
                  <input 
                    type="number" 
                    name="sessionTimeout" 
                    value={securitySettings.sessionTimeout} 
                    onChange={handleSecuritySettingsChange}
                    min="5"
                    max="120" 
                  />
                </div>
                <h3>Changer le mot de passe</h3>
                <div className="form-group">
                  <label>Mot de passe actuel</label>
                  <input type="password" name="currentPassword" />
                </div>
                <div className="form-group">
                  <label>Nouveau mot de passe</label>
                  <input 
                    type="password" 
                    name="changePassword" 
                    value={securitySettings.changePassword} 
                    onChange={handleSecuritySettingsChange} 
                  />
                </div>
                <div className="form-group">
                  <label>Confirmer le nouveau mot de passe</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    value={securitySettings.confirmPassword} 
                    onChange={handleSecuritySettingsChange} 
                  />
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="tab-content">
                <h2>Paramètres du compte</h2>
                <div className="form-group">
                  <label>Nom d'utilisateur</label>
                  <input type="text" value="martin.dupont" disabled />
                </div>
                <div className="form-group">
                  <label>Adresse e-mail</label>
                  <input type="email" value="martin.dupont@example.com" />
                </div>
                <div className="form-group">
                  <label>Nom complet</label>
                  <input type="text" value="Martin Dupont" />
                </div>
                <div className="form-group">
                  <label>Département</label>
                  <select>
                    <option value="it">IT</option>
                    <option value="support">Support</option>
                    <option value="security">Sécurité</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Fonction</label>
                  <input type="text" value="Technicien support" />
                </div>
                <div className="form-group">
                  <label>Photo de profil</label>
                  <div className="profile-picture-upload">
                    <img src="/user-avatar.png" alt="Avatar actuel" />
                    <button className="upload-btn">Changer la photo</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'customization' && (
              <div className="tab-content">
                <h2>Personnalisation de l'interface</h2>
                <div className="form-group">
                  <label>Disposition du tableau de bord</label>
                  <select>
                    <option value="default">Par défaut</option>
                    <option value="compact">Compact</option>
                    <option value="expanded">Étendu</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nombre d'éléments par page</label>
                  <select>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="form-group checkbox">
                  <input type="checkbox" id="showClosedTickets" checked />
                  <label htmlFor="showClosedTickets">Afficher les tickets fermés</label>
                </div>
                <div className="form-group checkbox">
                  <input type="checkbox" id="showTicketId" checked />
                  <label htmlFor="showTicketId">Afficher l'ID des tickets</label>
                </div>
                <div className="form-group checkbox">
                  <input type="checkbox" id="expandFilters" />
                  <label htmlFor="expandFilters">Développer les filtres par défaut</label>
                </div>
                <h3>Raccourcis clavier</h3>
                <div className="shortcuts-list">
                  <div className="shortcut-item">
                    <span className="shortcut-keys">Alt+N</span>
                    <span className="shortcut-action">Nouveau ticket</span>
                  </div>
                  <div className="shortcut-item">
                    <span className="shortcut-keys">Alt+F</span>
                    <span className="shortcut-action">Recherche</span>
                  </div>
                  <div className="shortcut-item">
                    <span className="shortcut-keys">Alt+R</span>
                    <span className="shortcut-action">Actualiser</span>
                  </div>
                  <div className="shortcut-item">
                    <span className="shortcut-keys">Alt+D</span>
                    <span className="shortcut-action">Tableau de bord</span>
                  </div>
                </div>
              </div>
            )}

            <div className="settings-actions">
              <button className="cancel-btn">Annuler</button>
              <button className="save-btn" onClick={handleSaveSettings}>Enregistrer les modifications</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
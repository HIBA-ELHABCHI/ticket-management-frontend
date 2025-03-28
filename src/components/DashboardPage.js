import React, { useState } from 'react';
import { 
  TicketPlus, 
  User, 
  Mail, 
  Phone,
  Lock,
  X,
  CheckCircle,
  Bell,
  AlertTriangle,
  LogIn,
  LogOut
} from 'lucide-react';

const DashboardPage = () => {
  // État principal
  const [tickets, setTickets] = useState([]);
  const [reminderTickets, setReminderTickets] = useState([]);
  const [activeSection, setActiveSection] = useState('tickets');
  
  // Authentification admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // Nouveau ticket
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'low',
    contactMethod: 'email',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    problem: '',
    reminderDate: ''
  });

  // Gestion authentification
  const handleAdminLogin = (e) => {
    e.preventDefault();
    // En production, utiliser un système sécurisé avec hachage
    if (adminPassword === 'admin123') {
      setIsAdmin(true);
      setAdminPassword('');
      setShowAdminLogin(false);
      alert('Connexion admin réussie');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    alert('Déconnexion réussie');
  };

  // Gestion des tickets
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    
    const requiredFields = ['title', 'firstName', 'lastName', 'email', 'problem'];
    const missingFields = requiredFields.filter(field => !newTicket[field]);
    
    if (missingFields.length > 0) {
      alert(`Veuillez remplir les champs obligatoires : ${missingFields.join(', ')}`);
      return;
    }

    const ticket = {
      id: `TICKET-${Date.now()}`,
      status: 'new',
      created: new Date().toISOString(),
      ...newTicket,
      client: {
        firstName: newTicket.firstName,
        lastName: newTicket.lastName,
        email: newTicket.email,
        phone: newTicket.phone
      }
    };

    setTickets([ticket, ...tickets]);
    simulateGmailNotification(ticket);
    resetTicketForm();
  };

  const simulateGmailNotification = (ticket) => {
    const adminLink = `https://admin.systemetickets.com/tickets/${ticket.id}?token=${btoa(ticket.id + '|' + new Date().getTime())}`;
    
    console.log('Notification envoyée à admin@systemetickets.com avec lien:', adminLink);
    alert(`Ticket créé! Un email avec lien de gestion a été envoyé à l'admin.\nLien simulé: ${adminLink}`);
  };

  const handleCreateReminder = (ticketId) => {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket && newTicket.reminderDate) {
      const reminderTicket = {
        ...ticket,
        reminderId: `REMINDER-${Date.now()}`,
        reminderDate: newTicket.reminderDate
      };
      setReminderTickets([reminderTicket, ...reminderTickets]);
      alert(`Rappel programmé pour le ${newTicket.reminderDate}`);
    } else {
      alert('Veuillez sélectionner une date de rappel');
    }
  };

  const handleCloseTicket = (ticketId) => {
    if (!isAdmin) {
      alert('Accès refusé : Seul l\'admin peut fermer les tickets');
      return;
    }
    
    setTickets(tickets.filter(t => t.id !== ticketId));
    setReminderTickets(reminderTickets.filter(t => t.id !== ticketId));
    alert(`Ticket ${ticketId} fermé avec succès`);
  };

  const resetTicketForm = () => {
    setNewTicket({
      title: '',
      description: '',
      priority: 'low',
      contactMethod: 'email',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      problem: '',
      reminderDate: ''
    });
  };

  // Composants UI
  const AdminAuthModal = () => (
    <div className="admin-auth-modal">
      <div className="modal-content">
        <h3><Lock size={20} /> Connexion Admin</h3>
        <form onSubmit={handleAdminLogin}>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Mot de passe admin"
            required
          />
          <div className="modal-actions">
            <button type="submit">Se connecter</button>
            <button type="button" onClick={() => setShowAdminLogin(false)}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const NavSection = () => (
    <nav className="navigation-section">
      <div className="nav-header">
        <h1>SYSTÈME DE TICKETS</h1>
        <div className="admin-status">
          {isAdmin ? (
            <span className="admin-badge">
              <User size={16} /> ADMIN
            </span>
          ) : (
            <button 
              className="login-btn"
              onClick={() => setShowAdminLogin(true)}
            >
              <LogIn size={16} /> Admin
            </button>
          )}
        </div>
      </div>
      
      <div className="nav-menu">
        <div 
          className={`nav-item ${activeSection === 'tickets' ? 'active' : ''}`} 
          onClick={() => setActiveSection('tickets')}
        >
          <TicketPlus size={24} />
          <span>TICKETS</span>
        </div>
        <div 
          className={`nav-item ${activeSection === 'create' ? 'active' : ''}`} 
          onClick={() => setActiveSection('create')}
        >
          <CheckCircle size={24} />
          <span>CRÉER</span>
        </div>
        {isAdmin && (
          <div 
            className={`nav-item ${activeSection === 'reminders' ? 'active' : ''}`} 
            onClick={() => setActiveSection('reminders')}
          >
            <Bell size={24} />
            <span>RAPPELS</span>
          </div>
        )}
      </div>
      
      {isAdmin && (
        <button className="logout-btn" onClick={handleAdminLogout}>
          <LogOut size={18} /> Déconnexion
        </button>
      )}
    </nav>
  );

  const TicketForm = () => (
    <div className="ticket-submission-container">
      <form onSubmit={handleCreateTicket} className="ticket-form">
        <h2>SOUMETTRE UN NOUVEAU TICKET</h2>
        
        <div className="form-section">
          <label>Informations Personnelles</label>
          <div className="name-inputs">
            <input 
              type="text"
              name="firstName"
              value={newTicket.firstName}
              onChange={handleInputChange}
              placeholder="Prénom *"
              required
            />
            <input 
              type="text"
              name="lastName"
              value={newTicket.lastName}
              onChange={handleInputChange}
              placeholder="Nom *"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <label>Coordonnées</label>
          <input 
            type="email"
            name="email"
            value={newTicket.email}
            onChange={handleInputChange}
            placeholder="Email *"
            required
          />
          <input 
            type="tel"
            name="phone"
            value={newTicket.phone}
            onChange={handleInputChange}
            placeholder="Téléphone"
          />
        </div>

        <div className="form-section">
          <label>Détails du Ticket</label>
          <input 
            type="text"
            name="title"
            value={newTicket.title}
            onChange={handleInputChange}
            placeholder="Titre du problème *"
            required
          />
          <textarea 
            name="description"
            value={newTicket.description}
            onChange={handleInputChange}
            placeholder="Description détaillée"
            rows="4"
          />
          <input 
            type="text"
            name="problem"
            value={newTicket.problem}
            onChange={handleInputChange}
            placeholder="Nature du problème *"
            required
          />
        </div>

        <div className="form-section">
          <label>Paramètres</label>
          <div className="form-row">
            <select 
              name="priority"
              value={newTicket.priority}
              onChange={handleInputChange}
              required
            >
              <option value="low">Basse Priorité</option>
              <option value="medium">Priorité Moyenne</option>
              <option value="high">Haute Priorité</option>
            </select>
            <select 
              name="contactMethod"
              value={newTicket.contactMethod}
              onChange={handleInputChange}
              required
            >
              <option value="email">Contact par Email</option>
              <option value="phone">Contact par Téléphone</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">
          <TicketPlus size={18} /> SOUMETTRE LE TICKET
        </button>
      </form>
    </div>
  );

  const TicketList = () => (
    <div className="ticket-list-container">
      <div className="ticket-list-header">
        <h2>TICKETS EN COURS ({tickets.length})</h2>
        {isAdmin && (
          <div className="reminder-input">
            <input 
              type="date"
              name="reminderDate"
              value={newTicket.reminderDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        )}
      </div>
      
      {tickets.length === 0 ? (
        <div className="empty-state">
          <p>Aucun ticket à afficher</p>
        </div>
      ) : (
        tickets.map(ticket => (
          <div key={ticket.id} className={`ticket-card ${ticket.priority}`}>
            <div className="ticket-header">
              <h3>{ticket.title}</h3>
              <span className="ticket-meta">
                {new Date(ticket.created).toLocaleDateString()}
                <span className={`priority-badge ${ticket.priority}`}>
                  {ticket.priority.toUpperCase()}
                </span>
              </span>
            </div>
            
            <div className="ticket-details">
              <p><strong>Client:</strong> {ticket.client.firstName} {ticket.client.lastName}</p>
              <p><strong>Contact:</strong> {ticket.client.email} {ticket.client.phone && `| ${ticket.client.phone}`}</p>
              <p><strong>Problème:</strong> {ticket.problem}</p>
              
              {isAdmin && (
                <div className="ticket-actions">
                  <button 
                    className="reminder-btn"
                    onClick={() => handleCreateReminder(ticket.id)}
                  >
                    <Bell size={16} /> Rappel
                  </button>
                  <button 
                    className="close-btn"
                    onClick={() => handleCloseTicket(ticket.id)}
                  >
                    <X size={16} /> Fermer
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );

  const ReminderList = () => (
    <div className="reminder-list-container">
      <h2>RAPPELS PROGRAMMÉS ({reminderTickets.length})</h2>
      
      {reminderTickets.length === 0 ? (
        <div className="empty-state">
          <p>Aucun rappel programmé</p>
        </div>
      ) : (
        reminderTickets.map(ticket => (
          <div key={ticket.reminderId} className="reminder-card">
            <div className="reminder-header">
              <AlertTriangle size={20} color="#FFA500" />
              <h3>{ticket.title}</h3>
              <span className="reminder-date">
                {ticket.reminderDate}
              </span>
            </div>
            
            <div className="reminder-details">
              <p><strong>Client:</strong> {ticket.client.firstName} {ticket.client.lastName}</p>
              <p><strong>Problème:</strong> {ticket.problem}</p>
              
              <div className="reminder-actions">
                <button 
                  className="close-btn"
                  onClick={() => handleCloseTicket(ticket.id)}
                >
                  <CheckCircle size={16} /> Résolu
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="dashboard-container">
      <style>{`
        /* Styles de base */
        :root {
          --primary: #6a11cb;
          --secondary: #2575fc;
          --success: #28a745;
          --warning: #ffc107;
          --danger: #dc3545;
          --light: #f8f9fa;
          --dark: #343a40;
        }
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f5f7fa;
          color: #333;
          line-height: 1.6;
        }
        
        /* Layout principal */
        .dashboard-container {
          display: flex;
          min-height: 100vh;
        }
        
        /* Navigation */
        .navigation-section {
          width: 280px;
          background: white;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
        }
        
        .nav-header {
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
          margin-bottom: 20px;
        }
        
        .nav-header h1 {
          font-size: 1.5rem;
          color: var(--primary);
          text-align: center;
          margin-bottom: 15px;
        }
        
        .admin-status {
          text-align: center;
        }
        
        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: var(--primary);
          color: white;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
        }
        
        .login-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: 1px solid var(--primary);
          color: var(--primary);
          padding: 5px 10px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.8rem;
          transition: all 0.3s;
        }
        
        .login-btn:hover {
          background: var(--primary);
          color: white;
        }
        
        .nav-menu {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
          color: #666;
        }
        
        .nav-item:hover {
          background: #f0f0f0;
          color: var(--primary);
        }
        
        .nav-item.active {
          background: rgba(106, 17, 203, 0.1);
          color: var(--primary);
          font-weight: 500;
        }
        
        .logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px;
          margin-top: auto;
          background: transparent;
          border: 1px solid var(--danger);
          color: var(--danger);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .logout-btn:hover {
          background: var(--danger);
          color: white;
        }
        
        /* Contenu principal */
        .main-content {
          flex-grow: 1;
          padding: 30px;
          overflow-y: auto;
        }
        
        /* Formulaire ticket */
        .ticket-submission-container {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.05);
          padding: 30px;
        }
        
        .ticket-form h2 {
          text-align: center;
          color: var(--primary);
          margin-bottom: 25px;
          font-size: 1.5rem;
        }
        
        .form-section {
          margin-bottom: 20px;
        }
        
        .form-section label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: var(--primary);
        }
        
        .name-inputs {
          display: flex;
          gap: 15px;
        }
        
        .name-inputs input {
          flex: 1;
        }
        
        input, textarea, select {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border 0.3s;
        }
        
        input:focus, textarea:focus, select:focus {
          border-color: var(--primary);
          outline: none;
        }
        
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .form-row {
          display: flex;
          gap: 15px;
        }
        
        .submit-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 15px;
          background: linear-gradient(to right, var(--primary), var(--secondary));
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(106, 17, 203, 0.3);
        }
        
        /* Liste des tickets */
        .ticket-list-container,
        .reminder-list-container {
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.05);
          padding: 25px;
        }
        
        .ticket-list-header,
        .reminder-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .ticket-list-header h2,
        .reminder-list-header h2 {
          color: var(--primary);
          font-size: 1.5rem;
        }
        
        .reminder-input input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px 0;
          color: #777;
        }
        
        /* Cartes de ticket */
        .ticket-card {
          background: white;
          border-left: 4px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        
        .ticket-card:hover {
          transform: translateY(-3px);
        }
        
        .ticket-card.high {
          border-left-color: var(--danger);
        }
        
        .ticket-card.medium {
          border-left-color: var(--warning);
        }
        
        .ticket-card.low {
          border-left-color: var(--success);
        }
        
        .ticket-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        
        .ticket-header h3 {
          font-size: 1.1rem;
          color: var(--dark);
        }
        
        .ticket-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: #777;
        }
        
        .priority-badge {
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .priority-badge.low {
          background: rgba(40, 167, 69, 0.1);
          color: var(--success);
        }
        
        .priority-badge.medium {
          background: rgba(255, 193, 7, 0.1);
          color: #d39e00;
        }
        
        .priority-badge.high {
          background: rgba(220, 53, 69, 0.1);
          color: var(--danger);
        }
        
        .ticket-details p {
          margin-bottom: 8px;
          font-size: 0.95rem;
        }
        
        .ticket-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 15px;
        }
        
        .reminder-btn,
        .close-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 15px;
          border: none;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .reminder-btn {
          background: var(--warning);
          color: #333;
        }
        
        .reminder-btn:hover {
          background: #e0a800;
        }
        
        .close-btn {
          background: var(--danger);
          color: white;
        }
        
        .close-btn:hover {
          background: #c82333;
        }
        
        /* Cartes de rappel */
        .reminder-card {
          background: white;
          border-left: 4px solid var(--warning);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .reminder-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        
        .reminder-header h3 {
          font-size: 1.1rem;
          color: var(--dark);
        }
        
        .reminder-date {
          margin-left: auto;
          font-size: 0.85rem;
          color: #777;
        }
        
        .reminder-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
        
        /* Modal admin */
        .admin-auth-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .admin-auth-modal .modal-content {
          background: white;
          padding: 25px;
          border-radius: 10px;
          width: 350px;
          max-width: 90%;
        }
        
        .admin-auth-modal h3 {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: var(--primary);
        }
        
        .admin-auth-modal input {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 20px;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        
        .modal-actions button {
          padding: 8px 15px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        
        .modal-actions button:first-child {
          background: var(--primary);
          color: white;
        }
        
        .modal-actions button:last-child {
          background: #eee;
          color: #333;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }
          
          .navigation-section {
            width: 100%;
            padding: 15px;
          }
          
          .nav-menu {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 5px;
          }
          
          .nav-item {
            flex: 1;
            min-width: 100px;
            justify-content: center;
            padding: 10px;
          }
          
          .main-content {
            padding: 20px;
          }
          
          .form-row {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>
      
      <NavSection />
      <main className="main-content">
        {activeSection === 'tickets' && <TicketList />}
        {activeSection === 'create' && <TicketForm />}
        {activeSection === 'reminders' && isAdmin && <ReminderList />}
      </main>
      
      {showAdminLogin && <AdminAuthModal />}
    </div>
  );
};

export default DashboardPage;
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './createticket.css';

const CreateTicketPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(3);
  const [ticketData, setTicketData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    department: 'IT',
    type: 'incident',
    assignee: '',
    attachments: [],
    tags: []
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');
  const [showSimilarTickets, setShowSimilarTickets] = useState(false);
  
  // Liste des départements
  const departments = [
    { id: 'IT', name: 'Informatique' },
    { id: 'Support', name: 'Support Technique' },
    { id: 'Infrastructure', name: 'Infrastructure' },
    { id: 'Sécurité', name: 'Sécurité' },
    { id: 'Réseau', name: 'Réseau' }
  ];
  
  // Liste des types de tickets
  const ticketTypes = [
    { id: 'incident', name: 'Incident' },
    { id: 'request', name: 'Demande de service' },
    { id: 'problem', name: 'Problème' },
    { id: 'change', name: 'Demande de changement' }
  ];
  
  // Liste des utilisateurs assignables
  const assignableUsers = [
    { id: 'user1', name: 'Martin Dupont' },
    { id: 'user2', name: 'Julie Martin' },
    { id: 'user3', name: 'Paul Durand' },
    { id: 'user4', name: 'Sophie Moreau' }
  ];

  // Suggestion de tickets similaires
  const similarTickets = [
    { id: 'TK-002', title: 'Imprimante hors service', status: 'in-progress', department: 'Support' },
    { id: 'TK-004', title: 'Erreur serveur', status: 'new', department: 'Infrastructure' },
    { id: 'TK-017', title: 'Problème avec paramètres email', status: 'resolved', department: 'IT' }
  ];
  
  // Rechercher des tickets similaires lorsque le titre change
  useEffect(() => {
    if (ticketData.title.length > 3) {
      // Dans un cas réel, on ferait un appel API ici
      setShowSimilarTickets(true);
    } else {
      setShowSimilarTickets(false);
    }
  }, [ticketData.title]);
  
  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Réinitialiser l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Gérer l'ajout de pièces jointes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setTicketData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };
  
  // Supprimer une pièce jointe
  const removeAttachment = (index) => {
    const updatedAttachments = [...ticketData.attachments];
    updatedAttachments.splice(index, 1);
    setTicketData(prev => ({
      ...prev,
      attachments: updatedAttachments
    }));
  };

  // Ajouter un tag
  const handleAddTag = () => {
    if (tagInput.trim() && !ticketData.tags.includes(tagInput.trim())) {
      setTicketData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  // Supprimer un tag
  const removeTag = (tag) => {
    setTicketData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  // Ajouter un tag avec la touche Entrée
  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};
    
    if (!ticketData.title.trim()) {
      newErrors.title = "Le titre est requis";
    } else if (ticketData.title.length < 5) {
      newErrors.title = "Le titre doit contenir au moins 5 caractères";
    }
    
    if (!ticketData.description.trim()) {
      newErrors.description = "La description est requise";
    } else if (ticketData.description.length < 10) {
      newErrors.description = "La description doit contenir au moins 10 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (validateForm()) {
      // Simuler l'envoi des données à l'API
      console.log("Données du ticket à soumettre:", ticketData);
      
      // Afficher un message de succès et rediriger après création réussie
      alert(`Ticket créé avec succès! ID: TK-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      window.scrollTo(0, 0);
    }
  };
  
  // Utiliser un ticket similaire comme modèle
  const useAsSimilar = (ticket) => {
    if (window.confirm(`Voulez-vous utiliser le ticket ${ticket.id} comme modèle ?`)) {
      navigate(`/tickets/${ticket.id}/duplicate`);
    }
  };
  
  // Annuler la création et retourner à la liste des tickets
  const handleCancel = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler ? Toutes les modifications seront perdues.")) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="/logo.png" alt="TechTicket Logo" />
          <h2>TechTicket</h2>
        </div>
        <div className="sidebar-menu">
          <Link to="/dashboard" className="menu-item">
            <span className="icon">📊</span> Tableau de bord
          </Link>
          <Link to="/tickets" className="menu-item active">
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
            <h1>Création de ticket</h1>
          </div>
          <div className="breadcrumb">
            <Link to="/dashboard">Tableau de bord</Link> &gt; 
            <Link to="/tickets">Tickets</Link> &gt; 
            <span>Nouveau ticket</span>
          </div>
          <div className="user-info">
            <div className="notification-icon" onClick={() => navigate('/notifications')}>
              🔔
              {notifications > 0 && <span className="badge">{notifications}</span>}
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

        <div className="create-ticket-content">
          {/* Messages d'erreur */}
          {submitted && Object.keys(errors).length > 0 && (
            <div className="error-summary">
              <h3>Des erreurs ont été trouvées :</h3>
              <ul>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tickets similaires suggestion */}
          {showSimilarTickets && (
            <div className="similar-tickets-panel">
              <h3>Tickets similaires existants</h3>
              <p className="hint">Des tickets similaires existent déjà. Veuillez vérifier s'ils correspondent à votre problème.</p>
              <div className="similar-tickets-list">
                {similarTickets.map(ticket => (
                  <div key={ticket.id} className="similar-ticket-item">
                    <div className="ticket-summary">
                      <span className="ticket-id">{ticket.id}</span>
                      <span className="ticket-title">{ticket.title}</span>
                      <span className={`status-badge status-${ticket.status}`}>
                        {ticket.status === 'new' && 'Nouveau'}
                        {ticket.status === 'in-progress' && 'En cours'}
                        {ticket.status === 'resolved' && 'Résolu'}
                      </span>
                    </div>
                    <div className="ticket-actions">
                      <button onClick={() => navigate(`/tickets/${ticket.id}`)}>Consulter</button>
                      <button onClick={() => useAsSimilar(ticket)}>Utiliser comme modèle</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="close-panel" onClick={() => setShowSimilarTickets(false)}>
                Fermer ×
              </button>
            </div>
          )}

          <div className="ticket-form-container">
            <form onSubmit={handleSubmit} className="ticket-form">
              <div className="form-section">
                <h2>Informations générales</h2>
                
                <div className="form-group">
                  <label htmlFor="title">Titre du ticket *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={ticketData.title}
                    onChange={handleChange}
                    className={errors.title ? 'error' : ''}
                    placeholder="Décrivez brièvement le problème ou la demande"
                  />
                  {errors.title && <span className="error-message">{errors.title}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description détaillée *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={ticketData.description}
                    onChange={handleChange}
                    className={errors.description ? 'error' : ''}
                    placeholder="Décrivez en détail le problème rencontré, incluant les étapes pour reproduire, les erreurs affichées, etc."
                    rows="6"
                  ></textarea>
                  {errors.description && <span className="error-message">{errors.description}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="department">Département concerné</label>
                  <select
                    id="department"
                    name="department"
                    value={ticketData.department}
                    onChange={handleChange}
                  >
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="type">Type de ticket</label>
                    <select
                      id="type"
                      name="type"
                      value={ticketData.type}
                      onChange={handleChange}
                    >
                      {ticketTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="priority">Priorité</label>
                    <select
                      id="priority"
                      name="priority"
                      value={ticketData.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Basse</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Haute</option>
                      <option value="critical">Critique</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h2>Attribution et étiquettes</h2>
                
                <div className="form-group">
                  <label htmlFor="assignee">Assigné à</label>
                  <select
                    id="assignee"
                    name="assignee"
                    value={ticketData.assignee}
                    onChange={handleChange}
                  >
                    <option value="">Non assigné</option>
                    {assignableUsers.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Étiquettes</label>
                  <div className="tag-input-container">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder="Ajouter une étiquette et appuyer sur Entrée"
                    />
                    <button 
                      type="button" 
                      onClick={handleAddTag}
                      className="add-tag-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="tags-container">
                    {ticketData.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="remove-tag"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {ticketData.tags.length === 0 && (
                      <span className="no-tags">Aucune étiquette ajoutée</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h2>Pièces jointes</h2>
                
                <div className="form-group">
                  <label htmlFor="attachments">Ajouter des fichiers</label>
                  <div className="file-upload-container">
                    <input
                      type="file"
                      id="attachments"
                      onChange={handleFileChange}
                      multiple
                      className="file-input"
                    />
                    <label htmlFor="attachments" className="file-upload-btn">
                      <span className="icon">📎</span> Sélectionner des fichiers
                    </label>
                  </div>
                  
                  <div className="attachments-list">
                    {ticketData.attachments.length > 0 ? (
                      ticketData.attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">({Math.round(file.size / 1024)} KB)</span>
                          <button 
                            type="button" 
                            onClick={() => removeAttachment(index)}
                            className="remove-file"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="no-attachments">Aucune pièce jointe</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-section">
                <h2>Informations supplémentaires</h2>
                
                <div className="form-group">
                  <label htmlFor="impact">Impact de l'incident</label>
                  <select
                    id="impact"
                    name="impact"
                    value={ticketData.impact || ''}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionnez l'impact</option>
                    <option value="individual">Individuel (un seul utilisateur)</option>
                    <option value="partial">Partiel (groupe d'utilisateurs)</option>
                    <option value="department">Département entier</option>
                    <option value="organization">Organisation entière</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="additionalInfo">Autres informations</label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={ticketData.additionalInfo || ''}
                    onChange={handleChange}
                    placeholder="Informations supplémentaires qui pourraient aider à résoudre le problème"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Annuler
                </button>
                <button type="submit" className="submit-btn">
                  Créer le ticket
                </button>
              </div>
            </form>
            
            <div className="sidebar-help">
              <div className="help-section">
                <h3>Conseils pour un bon ticket</h3>
                <ul>
                  <li>Soyez précis dans le titre et la description</li>
                  <li>Incluez les étapes pour reproduire le problème</li>
                  <li>Mentionnez les messages d'erreur exacts</li>
                  <li>Ajoutez des captures d'écran si possible</li>
                  <li>Indiquez l'impact sur votre travail</li>
                </ul>
              </div>
              
              <div className="help-section">
                <h3>Délais de réponse</h3>
                <p>Selon la priorité définie :</p>
                <ul>
                  <li><strong>Critique :</strong> 1 heure</li>
                  <li><strong>Haute :</strong> 4 heures</li>
                  <li><strong>Moyenne :</strong> 24 heures</li>
                  <li><strong>Basse :</strong> 48 heures</li>
                </ul>
              </div>
              
              <div className="help-section">
                <h3>Besoin d'aide ?</h3>
                <p>Pour toute question sur la création de tickets :</p>
                <button className="help-btn" onClick={() => navigate('/help/tickets')}>
                  <span className="icon">❓</span> Consulter l'aide
                </button>
                <button className="contact-btn" onClick={() => navigate('/support')}>
                  <span className="icon">✉️</span> Contacter le support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicketPage;
import React, { useState, useEffect } from 'react';
import './UtilisateurPage.css';

const UtilisateurPage = () => {
  // États pour gérer les données et l'UI
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [commentaire, setCommentaire] = useState('');
  const [filtres, setFiltres] = useState({
    statut: 'tous',
    priorite: 'toutes',
    recherche: ''
  });
  const [nouveauTicket, setNouveauTicket] = useState({
    titre: '',
    description: '',
    priorite: 'Moyenne',
    categorie: 'Logiciel',
    poste: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');
  const [fichierJoint, setFichierJoint] = useState(null);

  // Simuler le chargement des tickets depuis une API
  useEffect(() => {
    // Dans un environnement réel, ceci serait un appel API
    const mockTickets = [
      {
        id: 1,
        titre: "Problème de connexion Office 365",
        description: "Je ne peux pas me connecter à mon compte Office 365 depuis ce matin. Message d'erreur: 'Identifiants incorrects'",
        dateCreation: "2025-04-22",
        statut: "En cours",
        priorite: "Haute",
        categorie: "Logiciel",
        createur: "utilisateur@entreprise.fr", // l'utilisateur connecté
        poste: "Poste-A233",
        tags: ["office365", "connexion"],
        commentaires: [
          { auteur: "utilisateur@entreprise.fr", date: "2025-04-22", texte: "J'ai déjà essayé de réinitialiser mon mot de passe sans succès." },
          { auteur: "tech@parapord.fr", date: "2025-04-23", texte: "Nous avons identifié un problème avec le serveur d'authentification. Nous travaillons à sa résolution." }
        ],
        pieceJointe: "erreur_office365.png"
      },
      {
        id: 2,
        titre: "Imprimante hors service",
        description: "L'imprimante du service comptabilité affiche une erreur 'E-02' et ne répond plus aux commandes d'impression.",
        dateCreation: "2025-04-18",
        statut: "Résolu",
        priorite: "Moyenne",
        categorie: "Matériel",
        createur: "utilisateur@entreprise.fr",
        poste: "Imprimante-C112",
        tags: ["imprimante", "matériel"],
        commentaires: [
          { auteur: "utilisateur@entreprise.fr", date: "2025-04-18", texte: "L'imprimante est complètement bloquée et affiche un code d'erreur." },
          { auteur: "tech@parapord.fr", date: "2025-04-19", texte: "Il s'agit d'un problème de bourrage papier. Un technicien va passer cet après-midi." },
          { auteur: "tech@parapord.fr", date: "2025-04-20", texte: "L'imprimante a été réparée et fonctionne normalement maintenant." }
        ],
        pieceJointe: "imprimante_erreur.jpg"
      },
      {
        id: 3,
        titre: "Accès au dossier partagé impossible",
        description: "Je ne peux plus accéder au dossier partagé 'Projets-2025' sur le serveur. Message d'erreur: 'Accès refusé'",
        dateCreation: "2025-04-24",
        statut: "Nouveau",
        priorite: "Basse",
        categorie: "Réseau",
        createur: "utilisateur@entreprise.fr",
        poste: "Poste-B045",
        tags: ["réseau", "accès", "dossier"],
        commentaires: [
          { auteur: "utilisateur@entreprise.fr", date: "2025-04-24", texte: "J'avais accès à ce dossier hier encore." }
        ],
        pieceJointe: null
      }
    ];
    setTickets(mockTickets);
    setFilteredTickets(mockTickets);
  }, []);

  // Filtrer les tickets en fonction des critères
  useEffect(() => {
    let results = [...tickets];
    
    // Filtre par statut
    if (filtres.statut !== 'tous') {
      results = results.filter(ticket => ticket.statut === filtres.statut);
    }
    
    // Filtre par priorité
    if (filtres.priorite !== 'toutes') {
      results = results.filter(ticket => ticket.priorite === filtres.priorite);
    }
    
    // Filtre par recherche
    if (filtres.recherche) {
      const searchTerm = filtres.recherche.toLowerCase();
      results = results.filter(ticket => 
        ticket.titre.toLowerCase().includes(searchTerm) ||
        ticket.description.toLowerCase().includes(searchTerm) ||
        ticket.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    setFilteredTickets(results);
  }, [tickets, filtres]);

  // Gestionnaires d'événements
  const handleFiltreChange = (e) => {
    const { name, value } = e.target;
    setFiltres(prev => ({ ...prev, [name]: value }));
  };

  const handleTicketSelection = (ticket) => {
    setSelectedTicket(ticket);
    setShowNewTicketForm(false);
    setCommentaire('');
  };

  const handleNouveauTicketChange = (e) => {
    const { name, value } = e.target;
    setNouveauTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleTagAdd = () => {
    if (currentTag.trim() && !nouveauTicket.tags.includes(currentTag.trim())) {
      setNouveauTicket(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setNouveauTicket(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFichierJoint(file);
    }
  };

  const handleCommentaireSubmit = (e) => {
    e.preventDefault();
    if (!commentaire.trim() || !selectedTicket) return;

    const newComment = {
      auteur: "utilisateur@entreprise.fr", // Simuler l'utilisateur connecté
      date: new Date().toISOString().split('T')[0],
      texte: commentaire
    };

    const updatedTicket = {
      ...selectedTicket,
      commentaires: [...selectedTicket.commentaires, newComment]
    };

    updateTicket(updatedTicket);
    setCommentaire('');
  };

  const handleNouveauTicketSubmit = (e) => {
    e.preventDefault();
    
    // Validation simple
    if (!nouveauTicket.titre.trim() || !nouveauTicket.description.trim() || !nouveauTicket.poste.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Créer le nouveau ticket
    const newTicket = {
      id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
      titre: nouveauTicket.titre,
      description: nouveauTicket.description,
      dateCreation: new Date().toISOString().split('T')[0],
      statut: "Nouveau",
      priorite: nouveauTicket.priorite,
      categorie: nouveauTicket.categorie,
      createur: "utilisateur@entreprise.fr", // Simuler l'utilisateur connecté
      poste: nouveauTicket.poste,
      tags: nouveauTicket.tags,
      commentaires: [],
      pieceJointe: fichierJoint ? fichierJoint.name : null
    };

    // Ajouter le ticket à la liste
    setTickets(prev => [newTicket, ...prev]);
    
    // Réinitialiser le formulaire
    setNouveauTicket({
      titre: '',
      description: '',
      priorite: 'Moyenne',
      categorie: 'Logiciel',
      poste: '',
      tags: []
    });
    setFichierJoint(null);
    setShowNewTicketForm(false);
    
    // Sélectionner le nouveau ticket
    setSelectedTicket(newTicket);
  };

  // Fonction de mise à jour d'un ticket
  const updateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
  };

  return (
    <div className="utilisateur-page">
      <header className="header">
        <div className="logo">
          <h1>HelpDesk +</h1>
        </div>
        <div className="user-info">
          <span>Connecté en tant que: utilisateur@entreprise.fr</span>
          <button className="logout-btn">Déconnexion</button>
        </div>
      </header>

      <div className="dashboard">
        <div className="stats">
          <div className="stat-card">
            <h3>Mes tickets</h3>
            <p className="stat-number">{tickets.length}</p>
          </div>
          <div className="stat-card">
            <h3>En attente</h3>
            <p className="stat-number">{tickets.filter(t => t.statut === "Nouveau").length}</p>
          </div>
          <div className="stat-card">
            <h3>En cours</h3>
            <p className="stat-number">{tickets.filter(t => t.statut === "En cours").length}</p>
          </div>
          <div className="stat-card">
            <h3>Résolus</h3>
            <p className="stat-number">{tickets.filter(t => t.statut === "Résolu").length}</p>
          </div>
        </div>

        <div className="content-container">
          <div className="tickets-list-container">
            <div className="filtres">
              <div className="filtres-header">
                <h2>Mes demandes</h2>
                <button className="new-ticket-btn" onClick={() => {
                  setShowNewTicketForm(true);
                  setSelectedTicket(null);
                }}>
                  Nouveau ticket
                </button>
              </div>
              <div className="filtre-controls">
                <div className="filtre-group">
                  <label>Statut:</label>
                  <select name="statut" value={filtres.statut} onChange={handleFiltreChange}>
                    <option value="tous">Tous</option>
                    <option value="Nouveau">Nouveau</option>
                    <option value="En cours">En cours</option>
                    <option value="En attente">En attente</option>
                    <option value="Résolu">Résolu</option>
                  </select>
                </div>
                <div className="filtre-group">
                  <label>Priorité:</label>
                  <select name="priorite" value={filtres.priorite} onChange={handleFiltreChange}>
                    <option value="toutes">Toutes</option>
                    <option value="Haute">Haute</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Basse">Basse</option>
                  </select>
                </div>
                <div className="filtre-group search">
                  <input 
                    type="text" 
                    name="recherche" 
                    placeholder="Rechercher..." 
                    value={filtres.recherche} 
                    onChange={handleFiltreChange} 
                  />
                </div>
              </div>
            </div>

            <div className="tickets-list">
              {filteredTickets.length > 0 ? (
                filteredTickets.map(ticket => (
                  <div 
                    key={ticket.id} 
                    className={`ticket-card ${selectedTicket?.id === ticket.id ? 'selected' : ''} priority-${ticket.priorite.toLowerCase()}`}
                    onClick={() => handleTicketSelection(ticket)}
                  >
                    <div className="ticket-header">
                      <h3>#{ticket.id} - {ticket.titre}</h3>
                      <span className={`ticket-status status-${ticket.statut.toLowerCase().replace(' ', '-')}`}>
                        {ticket.statut}
                      </span>
                    </div>
                    <div className="ticket-info">
                      <span className="ticket-date">Créé le: {ticket.dateCreation}</span>
                      <span className="ticket-category">{ticket.categorie}</span>
                    </div>
                    <div className="ticket-tags">
                      {ticket.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-tickets">
                  <p>Aucun ticket ne correspond à vos critères de recherche</p>
                </div>
              )}
            </div>
          </div>

          {showNewTicketForm ? (
            <div className="new-ticket-form-container">
              <h2>Créer un nouveau ticket</h2>
              <form className="new-ticket-form" onSubmit={handleNouveauTicketSubmit}>
                <div className="form-group">
                  <label htmlFor="titre">Titre*</label>
                  <input 
                    type="text" 
                    id="titre" 
                    name="titre" 
                    value={nouveauTicket.titre} 
                    onChange={handleNouveauTicketChange}
                    placeholder="Résumez votre problème"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description détaillée*</label>
                  <textarea 
                    id="description" 
                    name="description" 
                    value={nouveauTicket.description} 
                    onChange={handleNouveauTicketChange}
                    placeholder="Décrivez en détail votre problème..."
                    required
                    rows="5"
                  ></textarea>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="priorite">Priorité</label>
                    <select 
                      id="priorite" 
                      name="priorite" 
                      value={nouveauTicket.priorite} 
                      onChange={handleNouveauTicketChange}
                    >
                      <option value="Basse">Basse</option>
                      <option value="Moyenne">Moyenne</option>
                      <option value="Haute">Haute</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="categorie">Catégorie</label>
                    <select 
                      id="categorie" 
                      name="categorie" 
                      value={nouveauTicket.categorie} 
                      onChange={handleNouveauTicketChange}
                    >
                      <option value="Logiciel">Logiciel</option>
                      <option value="Matériel">Matériel</option>
                      <option value="Réseau">Réseau</option>
                      <option value="Compte utilisateur">Compte utilisateur</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="poste">Poste de travail / Équipement*</label>
                  <input 
                    type="text" 
                    id="poste" 
                    name="poste" 
                    value={nouveauTicket.poste} 
                    onChange={handleNouveauTicketChange}
                    placeholder="Ex: Poste-A233, Imprimante-C112..."
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Tags (mots-clés)</label>
                  <div className="tags-input">
                    <input 
                      type="text" 
                      value={currentTag} 
                      onChange={(e) => setCurrentTag(e.target.value)} 
                      placeholder="Ajouter un tag..."
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                    />
                    <button type="button" onClick={handleTagAdd}>+</button>
                  </div>
                  <div className="tags-container">
                    {nouveauTicket.tags.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                        <button type="button" onClick={() => handleTagRemove(tag)}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="fichier">Pièce jointe</label>
                  <input 
                    type="file" 
                    id="fichier" 
                    onChange={handleFileChange} 
                  />
                  {fichierJoint && (
                    <div className="selected-file">
                      <span>Fichier sélectionné: {fichierJoint.name}</span>
                      <button type="button" onClick={() => setFichierJoint(null)}>&times;</button>
                    </div>
                  )}
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={() => setShowNewTicketForm(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="submit-btn">Soumettre le ticket</button>
                </div>
              </form>
            </div>
          ) : selectedTicket ? (
            <div className="ticket-details">
              <div className="ticket-header-details">
                <h2>#{selectedTicket.id} - {selectedTicket.titre}</h2>
                <span className={`ticket-status status-${selectedTicket.statut.toLowerCase().replace(' ', '-')}`}>
                  {selectedTicket.statut}
                </span>
              </div>

              <div className="ticket-meta">
                <div className="meta-item">
                  <span className="meta-label">Créé le:</span>
                  <span className="meta-value">{selectedTicket.dateCreation}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Catégorie:</span>
                  <span className="meta-value">{selectedTicket.categorie}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Poste:</span>
                  <span className="meta-value">{selectedTicket.poste}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Priorité:</span>
                  <span className={`meta-value priority-badge priority-${selectedTicket.priorite.toLowerCase()}`}>
                    {selectedTicket.priorite}
                  </span>
                </div>
              </div>

              <div className="ticket-description">
                <h3>Description</h3>
                <p>{selectedTicket.description}</p>
              </div>

              <div className="ticket-tags-container">
                <h3>Tags</h3>
                <div className="ticket-tags">
                  {selectedTicket.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              {selectedTicket.pieceJointe && (
                <div className="ticket-attachments">
                  <h3>Pièces jointes</h3>
                  <div className="attachment">
                    <i className="attachment-icon"></i>
                    <span>{selectedTicket.pieceJointe}</span>
                    <button className="download-btn">Télécharger</button>
                  </div>
                </div>
              )}

              <div className="ticket-comments">
                <h3>Commentaires et suivi</h3>
                <div className="comments-list">
                  {selectedTicket.commentaires.map((comment, index) => (
                    <div 
                      key={index} 
                      className={`comment ${comment.auteur.includes('tech') ? 'tech-comment' : 'user-comment'}`}
                    >
                      <div className="comment-header">
                        <span className="comment-author">{comment.auteur}</span>
                        <span className="comment-date">{comment.date}</span>
                      </div>
                      <div className="comment-body">
                        <p>{comment.texte}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <form className="comment-form" onSubmit={handleCommentaireSubmit}>
                  <textarea 
                    placeholder="Ajouter un commentaire ou une précision..." 
                    value={commentaire}
                    onChange={(e) => setCommentaire(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" className="submit-comment">Envoyer</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="no-ticket-selected">
              <div className="info-message">
                <i className="info-icon"></i>
                <div>
                  <h3>Bienvenue dans votre espace support informatique</h3>
                  <p>Sélectionnez un ticket existant pour voir les détails ou créez une nouvelle demande d'assistance en cliquant sur "Nouveau ticket".</p>
                  <button 
                    className="new-ticket-btn-large" 
                    onClick={() => setShowNewTicketForm(true)}
                  >
                    Créer un nouveau ticket
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UtilisateurPage;
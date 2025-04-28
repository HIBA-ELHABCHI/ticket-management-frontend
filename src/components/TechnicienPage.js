import React, { useState, useEffect } from 'react';
import './TechnicienPage.css';

const TechnicienPage = () => {
  // États pour gérer les données
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [commentaire, setCommentaire] = useState('');
  const [filtres, setFiltres] = useState({
    statut: 'tous',
    priorite: 'toutes',
    recherche: ''
  });

  // Simuler le chargement des tickets depuis une API
  useEffect(() => {
    // Dans un environnement réel, ceci serait un appel API
    const mockTickets = [
      {
        id: 1,
        titre: "Problème connexion réseau",
        description: "Impossible de se connecter au réseau depuis ce matin",
        dateCreation: "2025-04-20",
        statut: "Nouveau",
        priorite: "Haute",
        categorie: "Réseau",
        createur: "jean.dupont@entreprise.fr",
        poste: "Poste-A233",
        tags: ["réseau", "connexion"],
        commentaires: [
          { auteur: "jean.dupont@entreprise.fr", date: "2025-04-20", texte: "Je ne peux accéder à aucun site web" }
        ],
        pieceJointe: "capture_ecran.png"
      },
      {
        id: 2,
        titre: "Logiciel comptabilité plantage",
        description: "Le logiciel de comptabilité se ferme inopinément lors de l'exportation des données",
        dateCreation: "2025-04-19",
        statut: "En cours",
        priorite: "Moyenne",
        categorie: "Logiciel",
        createur: "sophie.martin@entreprise.fr",
        poste: "Poste-B112",
        tags: ["logiciel", "comptabilité", "plantage"],
        commentaires: [
          { auteur: "sophie.martin@entreprise.fr", date: "2025-04-19", texte: "Le problème survient uniquement lors des exports vers Excel" },
          { auteur: "tech@parapord.fr", date: "2025-04-20", texte: "J'ai vérifié la version du logiciel, un problème de compatibilité est possible" }
        ],
        pieceJointe: "erreur_log.txt"
      },
      {
        id: 3,
        titre: "Écran qui scintille",
        description: "Mon écran scintille toutes les 30 secondes environ",
        dateCreation: "2025-04-18",
        statut: "En attente",
        priorite: "Basse",
        categorie: "Matériel",
        createur: "paul.richard@entreprise.fr",
        poste: "Poste-C056",
        tags: ["matériel", "écran"],
        commentaires: [
          { auteur: "paul.richard@entreprise.fr", date: "2025-04-18", texte: "Le problème existe depuis la dernière mise à jour" },
          { auteur: "tech@parapord.fr", date: "2025-04-19", texte: "Avez-vous essayé de mettre à jour les pilotes graphiques?" },
          { auteur: "paul.richard@entreprise.fr", date: "2025-04-19", texte: "Oui, sans succès" }
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
        ticket.createur.toLowerCase().includes(searchTerm) ||
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
    setCommentaire('');
  };

  const handleStatutChange = (e) => {
    if (!selectedTicket) return;
    
    const updatedTicket = { ...selectedTicket, statut: e.target.value };
    updateTicket(updatedTicket);
  };

  const handleCommentaireSubmit = (e) => {
    e.preventDefault();
    if (!commentaire.trim() || !selectedTicket) return;

    const newComment = {
      auteur: "tech@parapord.fr", // Simuler l'utilisateur connecté
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

  // Fonction de mise à jour d'un ticket
  const updateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
    setSelectedTicket(updatedTicket);
  };

  return (
    <div className="technicien-page">
      <header className="header">
        <div className="logo">
          <h1>HelpDesk +</h1>
        </div>
        <div className="user-info">
          <span>Technicien connecté: Tech Parapord</span>
          <button className="logout-btn">Déconnexion</button>
        </div>
      </header>

      <div className="dashboard">
        <div className="stats">
          <div className="stat-card">
            <h3>Tickets assignés</h3>
            <p className="stat-number">{tickets.length}</p>
          </div>
          <div className="stat-card">
            <h3>Nouveaux</h3>
            <p className="stat-number">{tickets.filter(t => t.statut === "Nouveau").length}</p>
          </div>
          <div className="stat-card">
            <h3>En cours</h3>
            <p className="stat-number">{tickets.filter(t => t.statut === "En cours").length}</p>
          </div>
          <div className="stat-card">
            <h3>En attente</h3>
            <p className="stat-number">{tickets.filter(t => t.statut === "En attente").length}</p>
          </div>
        </div>

        <div className="content-container">
          <div className="tickets-list-container">
            <div className="filtres">
              <h2>Mes tickets</h2>
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
                      <span className="ticket-user">Par: {ticket.createur}</span>
                    </div>
                    <div className="ticket-category">
                      <span className="category-badge">{ticket.categorie}</span>
                      <div className="ticket-tags">
                        {ticket.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
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

          {selectedTicket ? (
            <div className="ticket-details">
              <div className="ticket-header-details">
                <h2>#{selectedTicket.id} - {selectedTicket.titre}</h2>
                <div className="ticket-actions">
                  <select 
                    value={selectedTicket.statut} 
                    onChange={handleStatutChange}
                    className={`status-select status-${selectedTicket.statut.toLowerCase().replace(' ', '-')}`}
                  >
                    <option value="Nouveau">Nouveau</option>
                    <option value="En cours">En cours</option>
                    <option value="En attente">En attente</option>
                    <option value="Résolu">Résolu</option>
                  </select>
                </div>
              </div>

              <div className="ticket-meta">
                <div className="meta-item">
                  <span className="meta-label">Créé le:</span>
                  <span className="meta-value">{selectedTicket.dateCreation}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Utilisateur:</span>
                  <span className="meta-value">{selectedTicket.createur}</span>
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
                <div className="meta-item">
                  <span className="meta-label">Catégorie:</span>
                  <span className="meta-value">{selectedTicket.categorie}</span>
                </div>
              </div>

              <div className="ticket-description">
                <h3>Description</h3>
                <p>{selectedTicket.description}</p>
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
                <h3>Commentaires</h3>
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
                    placeholder="Ajouter un commentaire..." 
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
              <p>Sélectionnez un ticket pour voir les détails</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechnicienPage;
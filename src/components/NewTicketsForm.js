import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './newTicket.css';

const NewTicketsForm = () => {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    priority: 'medium',
    department: '',
    attachments: [],
    userInfo: {
      nom: '',
      prenom: '',
      email: '',
      adresse: ''
    },
    problemType: '' // Nouveau champ pour le type de problème
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Gestion des champs imbriqués dans userInfo
    if (name.startsWith('userInfo.')) {
      const field = name.split('.')[1];
      setTicket(prev => ({
        ...prev,
        userInfo: {
          ...prev.userInfo,
          [field]: value
        }
      }));
    } else {
      setTicket(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleFileChange = (e) => {
    setTicket(prev => ({
      ...prev,
      attachments: Array.from(e.target.files)
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!ticket.title.trim()) {
      newErrors.title = 'Le titre est requis';
    }
    
    if (!ticket.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    
    if (!ticket.department) {
      newErrors.department = 'Veuillez sélectionner un département';
    }
    
    if (!ticket.userInfo.nom.trim()) {
      newErrors['userInfo.nom'] = 'Le nom est requis';
    }
    
    if (!ticket.userInfo.prenom.trim()) {
      newErrors['userInfo.prenom'] = 'Le prénom est requis';
    }
    
    if (!ticket.userInfo.email.trim()) {
      newErrors['userInfo.email'] = 'L\'email est requis';
    } else if (!/^\S+@\S+\.\S+$/.test(ticket.userInfo.email)) {
      newErrors['userInfo.email'] = 'Email invalide';
    }
    
    if (!ticket.problemType.trim()) {
      newErrors.problemType = 'Veuillez spécifier le type de problème';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to dashboard and pass the new ticket data
      navigate('/dashboard', { 
        state: { 
          newTicket: {
            ...ticket,
            priority: ticket.priority,
            department: ticket.department,
            problemType: ticket.problemType
          } 
        } 
      });
      
    } catch (error) {
      console.error('Erreur lors de la création du ticket:', error);
      setErrors({ submit: 'Une erreur est survenue lors de la création du ticket' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Rest of the component remains the same
  
  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="new-ticket-page">
      <div className="sidebar">
        {/* ... reste du sidebar ... */}
      </div>

      <div className="main-content">
        <div className="top-bar">
          <div className="page-title">
            <h1>Créer un nouveau ticket</h1>
          </div>
          <div className="user-info">
            {/* Info utilisateur */}
          </div>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2 className="section-title">Informations sur le problème</h2>
            
            <div className="form-group">
              <label htmlFor="title">Titre du problème <span className="required">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                value={ticket.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
                placeholder="Ex: Problème de connexion au serveur"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="problemType">Type de problème <span className="required">*</span></label>
              <input
                type="text"
                id="problemType"
                name="problemType"
                value={ticket.problemType}
                onChange={handleChange}
                className={errors.problemType ? 'error' : ''}
                placeholder="Ex: Problème réseau, Logiciel, Matériel..."
              />
              {errors.problemType && <span className="error-message">{errors.problemType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description détaillée <span className="required">*</span></label>
              <textarea
                id="description"
                name="description"
                value={ticket.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                rows="5"
                placeholder="Décrivez le problème en détail, les étapes pour le reproduire, etc."
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="priority">Priorité</label>
                <select
                  id="priority"
                  name="priority"
                  value={ticket.priority}
                  onChange={handleChange}
                >
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="critical">Critique</option>
                </select>
              </div>

              <div className="form-group half">
                <label htmlFor="department">Département concerné <span className="required">*</span></label>
                <select
                  id="department"
                  name="department"
                  value={ticket.department}
                  onChange={handleChange}
                  className={errors.department ? 'error' : ''}
                >
                  <option value="">Sélectionner un département</option>
                  <option value="IT">IT</option>
                  <option value="Support">Support</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Sécurité">Sécurité</option>
                  <option value="Réseau">Réseau</option>
                </select>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>
            </div>

            <h2 className="section-title">Informations personnelles</h2>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="userInfo.nom">Nom <span className="required">*</span></label>
                <input
                  type="text"
                  id="userInfo.nom"
                  name="userInfo.nom"
                  value={ticket.userInfo.nom}
                  onChange={handleChange}
                  className={errors['userInfo.nom'] ? 'error' : ''}
                  placeholder="Votre nom"
                />
                {errors['userInfo.nom'] && <span className="error-message">{errors['userInfo.nom']}</span>}
              </div>

              <div className="form-group half">
                <label htmlFor="userInfo.prenom">Prénom <span className="required">*</span></label>
                <input
                  type="text"
                  id="userInfo.prenom"
                  name="userInfo.prenom"
                  value={ticket.userInfo.prenom}
                  onChange={handleChange}
                  className={errors['userInfo.prenom'] ? 'error' : ''}
                  placeholder="Votre prénom"
                />
                {errors['userInfo.prenom'] && <span className="error-message">{errors['userInfo.prenom']}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="userInfo.email">Email <span className="required">*</span></label>
                <input
                  type="email"
                  id="userInfo.email"
                  name="userInfo.email"
                  value={ticket.userInfo.email}
                  onChange={handleChange}
                  className={errors['userInfo.email'] ? 'error' : ''}
                  placeholder="votre@email.com"
                />
                {errors['userInfo.email'] && <span className="error-message">{errors['userInfo.email']}</span>}
              </div>

              <div className="form-group half">
                <label htmlFor="userInfo.adresse">Adresse</label>
                <input
                  type="text"
                  id="userInfo.adresse"
                  name="userInfo.adresse"
                  value={ticket.userInfo.adresse}
                  onChange={handleChange}
                  placeholder="Votre adresse (facultatif)"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="attachments">Pièces jointes</label>
              <input
                type="file"
                id="attachments"
                name="attachments"
                onChange={handleFileChange}
                multiple
              />
              <small>Vous pouvez joindre des captures d'écran ou documents utiles (max 5MB)</small>
            </div>

            {errors.submit && (
              <div className="error-alert">
                <p>{errors.submit}</p>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Création en cours...' : 'Créer le ticket'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTicketsForm;
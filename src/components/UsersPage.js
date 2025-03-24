import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const UsersPage = () => {
  const users = [
    { id: 1, name: 'Martin Dupont', email: 'martin@techticket.com', role: 'Admin', lastLogin: '2025-03-23' },
    { id: 2, name: 'Julie Martin', email: 'julie@techticket.com', role: 'Technicien', lastLogin: '2025-03-22' },
    { id: 3, name: 'Paul Durand', email: 'paul@techticket.com', role: 'Technicien', lastLogin: '2025-03-21' },
    { id: 4, name: 'Sophie Leclerc', email: 'sophie@techticket.com', role: 'Utilisateur', lastLogin: '2025-03-20' }
  ];

  return (
    <div className="dashboard-page">
      <div className="sidebar">
        {/* Sidebar identique au dashboard */}
      </div>

      <div className="main-content">
        <div className="top-bar">
          {/* Barre supérieure identique */}
        </div>

        <div className="dashboard-content">
          <h1>Gestion des Utilisateurs</h1>
          
          <div className="user-actions">
            <button className="action-btn">
              <span className="icon">➕</span> Ajouter un utilisateur
            </button>
            <input type="text" placeholder="Rechercher des utilisateurs..." />
          </div>

          <table className="users-table">
            <thead>
              <tr>
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
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.lastLogin).toLocaleDateString('fr-FR')}</td>
                  <td>
                    <button className="action-icon" title="Modifier">✏️</button>
                    <button className="action-icon" title="Supprimer">🗑️</button>
                    <button className="action-icon" title="Réinitialiser mot de passe">🔑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="user-roles-info">
            <h3>Rôles disponibles :</h3>
            <ul>
              <li><strong>Admin</strong> - Accès complet au système</li>
              <li><strong>Technicien</strong> - Peut gérer les tickets</li>
              <li><strong>Utilisateur</strong> - Peut créer des tickets</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
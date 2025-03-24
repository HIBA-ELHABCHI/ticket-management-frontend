import React, { createContext, useState, useEffect } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  // Initialiser l'état des tickets avec un tableau vide
  const [tickets, setTickets] = useState([]);

  // Charger les tickets depuis le localStorage au démarrage
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('tickets')) || [];
    setTickets(storedTickets);
  }, []);

  // Sauvegarder les tickets dans le localStorage à chaque mise à jour
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  // Fonction pour ajouter un nouveau ticket
  const addTicket = (newTicket) => {
    setTickets((prevTickets) => [...prevTickets, newTicket]);
  };

  // Fonction pour supprimer un ticket
  const deleteTicket = (ticketId) => {
    setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
  };

  // Fonction pour mettre à jour un ticket
  const updateTicket = (ticketId, updatedData) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, ...updatedData } : ticket
      )
    );
  };

  // Fonction pour marquer un ticket comme "Fermé"
  const closeTicket = (ticketId) => {
    updateTicket(ticketId, { status: 'closed' });
  };

  // Fonction pour marquer un ticket comme "En cours"
  const markTicketInProgress = (ticketId) => {
    updateTicket(ticketId, { status: 'in-progress' });
  };

  // Fonction pour marquer un ticket comme "Résolu"
  const markTicketResolved = (ticketId) => {
    updateTicket(ticketId, { status: 'resolved' });
  };

  // Fonction pour assigner un ticket à un utilisateur
  const assignTicket = (ticketId, assignee) => {
    updateTicket(ticketId, { assignee });
  };

  // Valeur du contexte à partager
  const contextValue = {
    tickets,
    addTicket,
    deleteTicket,
    updateTicket,
    closeTicket,
    markTicketInProgress,
    markTicketResolved,
    assignTicket,
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, deleteTicket }}>
    {children}
  </TicketContext.Provider>
  );
};
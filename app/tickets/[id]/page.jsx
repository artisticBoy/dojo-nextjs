import React from "react";

async function getTicket(id) {
  const response = await fetch("http://localhost:8000/api/tickets/" + id, {
    next: {
      revalidate: 30,
    },
  });
  return response.json();
}

export default async function page({ params }) {
  const ticket = await getTicket(params.id);
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}

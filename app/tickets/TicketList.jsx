import Link from "next/link";
import React from "react";

//function to call API
async function getTicket() {
  const response = await fetch("http://localhost:8000/api/tickets", {
    next: {
      revalidate: 30,
    },
  });
  return response.json();
}

export default async function TicketList() {
  const tickets = await getTicket();
  console.log(tickets);
  return (
    <div>
      {tickets.map((ticket) => (
        <Link href={"/tickets/" + ticket.id}>
          <div key={ticket.id} className="card my-5">
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}....</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </div>
        </Link>
      ))}
      {tickets.length === 0 && (
        <p className="text-center">There are no tickets, yay!</p>
      )}
    </div>
  );
}

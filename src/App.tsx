import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import "./App.css";
import {
  type LeadType,
  type LeadUpdates,
  type leadsFilterByStatus,
} from "./types/lead";
import Lead from "./components/Lead";
import { getLeadByStatus, searchLeads } from "./components/leads-util";

function App() {
  const [leads, setLeads] = useState<LeadType[]>((): LeadType[] => {
    try {
      const stockedLeads = localStorage.getItem("leads");
      if (stockedLeads) return JSON.parse(stockedLeads);
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  });
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<leadsFilterByStatus>("tous");
  let currentLeads = searchLeads(leads, query);

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const society = formData.get("society")?.toString().trim();
    const estimatedValue = Number(formData.get("estimatedValue"));
    const status = formData.get("status");

    if (
      !Number.isFinite(estimatedValue) ||
      estimatedValue <= 0 ||
      !fullName ||
      !email ||
      !society ||
      !estimatedValue ||
      leads.some((lead) => lead.email.toLowerCase() === email.toLowerCase())
    ) {
      return;
    }

    if (
      status !== "new" &&
      status !== "contacted" &&
      status !== "qualified" &&
      status !== "won" &&
      status !== "lost"
    ) {
      return;
    }

    const newLead: LeadType = {
      id: Date.now(),
      fullName,
      email,
      society,
      estimatedValue,
      status,
    };

    setLeads((leads) => [...leads, newLead]);

    e.currentTarget.reset();
  }

  function changeFilterHandler(e: ChangeEvent<HTMLSelectElement>) {
    setFilter(e.target.value as leadsFilterByStatus);
  }
  if (filter) currentLeads = getLeadByStatus(currentLeads, filter);

  function deleteLead(id: number) {
    setLeads((currentLeads) => currentLeads.filter((lead) => lead.id !== id));
  }

  function updateLead(id: number, updatedData: LeadUpdates) {
    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === id ? { ...lead, ...updatedData, id: lead.id } : lead,
      ),
    );
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
  }

  return (
    <main>
      <h1>LeadFLow</h1>
      <section id="add-lead">
        <h2>Ajouter un lead</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="full name"
            aria-label="nom complet"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            aria-label="email"
          />
          <input
            type="text"
            name="society"
            id="society"
            placeholder="society"
            aria-label="company"
          />
          <input
            type="number"
            name="estimatedValue"
            id="estimatedValue"
            placeholder="estimated value"
            aria-label="estimated value"
          />
          <select name="status" id="status" aria-label="status">
            <option value="new">new</option>
            <option value="contacted">contacted</option>
            <option value="qualified">qualified</option>
            <option value="won">won</option>
            <option value="lost">lost</option>
          </select>
          <button type="submit">Ajouter un lead</button>
        </form>
      </section>

      <section id="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            name="search"
            id="search"
            value={query}
            placeholder="Search"
            onChange={handleChange}
            aria-label="Recherche"
          />
          <select
            name="filter"
            id="filter"
            onChange={changeFilterHandler}
            aria-label="Filtrer par statut"
          >
            <option value="tous">tous</option>
            <option value="new">new</option>
            <option value="contacted">contacted</option>
            <option value="qualified">qualified</option>
            <option value="won">won</option>
            <option value="lost">lost</option>
          </select>
        </form>
      </section>
      <section id="leads">
        {currentLeads.length === 0 ? (
          <p>Aucun lead trouvé</p>
        ) : (
          <ul>
            {currentLeads.map((lead) => (
              <Lead
                lead={lead}
                key={lead.id}
                onDeleteLead={deleteLead}
                onUpdateLead={updateLead}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;

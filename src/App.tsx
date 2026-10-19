import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import "./App.css";
import {
  sampleLeads,
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
      return sampleLeads;
    } catch (e) {
      console.error(e);
      return sampleLeads;
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
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">full name</label>
        <input type="text" name="fullName" id="fullName" />
        <label htmlFor="email">email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="society">society</label>
        <input type="text" name="society" id="society" />
        <label htmlFor="estimatedValue">estimated Value</label>
        <input type="number" name="estimatedValue" id="estimatedValue" />
        <select name="status" id="status">
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="qualified">qualified</option>
          <option value="won">won</option>
          <option value="lost">lost</option>
        </select>
        <button type="submit">Send</button>
      </form>

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
        />
        <select name="filter" id="filter" onChange={changeFilterHandler}>
          <option value="tous">tous</option>
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="qualified">qualified</option>
          <option value="won">won</option>
          <option value="lost">lost</option>
        </select>
      </form>
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
    </>
  );
}

export default App;

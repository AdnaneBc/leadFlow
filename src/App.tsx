import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  type LeadType,
  type LeadUpdates,
  type leadsFilterByStatus,
} from "./types/lead";
import Lead from "./components/Lead";
import { getLeadByStatus, searchLeads } from "./components/leads-util";
import { track } from "./analytics";
import ConsentBanner from "./components/ConsentBanner";
import Input from "./components/ui/Input";
import Select from "./components/ui/Select";
import Button from "./components/ui/Button";

const SELECT_OPTIONS = ["new", "contacted", "qualified", "won", "lost"];

const FIELD_NAMES: Record<string, string> = {
  fullName: "full_name",
  society: "company",
  estimatedValue: "estimated_value",
};

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
  const [errorMsg, setErrorMsg] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<leadsFilterByStatus>("tous");
  let currentLeads = searchLeads(leads, query);

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    if (query.trim() === "") return;
    const timer = setTimeout(() => {
      track("search_leads", {
        query_length: query.length,
        results_count: searchLeads(leads, query).length,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [query, leads]);

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const society = formData.get("society")?.toString().trim();
    const estimatedValue = Number(formData.get("estimatedValue"));
    const status = formData.get("status");

    if (!fullName || !email || !society || !formData.get("estimatedValue")) {
      setErrorMsg("Merci de remplir tous les champs.");
      track("add_lead_failed", { error_reason: "missing_field" });
      return;
    }
    if (!Number.isFinite(estimatedValue) || estimatedValue <= 0) {
      setErrorMsg("La valeur doit être supérieure à 0.");
      track("add_lead_failed", { error_reason: "invalid_value" });
      return;
    }
    if (
      leads.some((lead) => lead.email.toLowerCase() === email.toLowerCase())
    ) {
      setErrorMsg("Ce lead existe déjà (email en double).");
      track("add_lead_failed", { error_reason: "duplicate_email" });
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
    track("add_lead", {
      lead_status: status,
    });
    setErrorMsg("");

    e.currentTarget.reset();
  }

  function changeFilterHandler(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    track("filter_leads", {
      lead_status: value === "tous" ? "all" : value,
    });
    setFilter(value as leadsFilterByStatus);
  }
  if (filter) currentLeads = getLeadByStatus(currentLeads, filter);

  function deleteLead(id: number) {
    const currentLead = leads.find((lead) => lead.id === id);
    if (currentLead) {
      track("delete_lead", {
        lead_status: currentLead.status,
      });
      setLeads((currentLeads) => currentLeads.filter((lead) => lead.id !== id));
    }
  }

  function updateLead(id: number, updatedData: LeadUpdates) {
    const lead = leads.find((lead) => lead.id === id);
    if (!lead) return;
    if (updatedData.status) {
      track("change_lead_status", {
        previous_status: lead.status,
        new_status: updatedData.status,
      });
    } else {
      const fieldNames = Object.keys(updatedData)
        .filter((key) => {
          const k = key as keyof LeadUpdates;
          return updatedData[k] !== lead[k];
        })
        .map((key) => FIELD_NAMES[key] ?? key);
      if (fieldNames.length > 0) {
        track("update_lead", {
          fields_changed: fieldNames.join(","),
        });
      }
    }

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
      <h1>LeadFlow</h1>
      <section id="add-lead">
        <h2>Ajouter un lead</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="full name"
            text="Nom complet"
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            text="Email"
          />
          <Input
            type="text"
            name="society"
            id="society"
            placeholder="society"
            text="Entreprise"
          />

          <Input
            type="number"
            name="estimatedValue"
            id="estimatedValue"
            placeholder="estimated value"
            text="Valeur estimée"
          />

          <Select
            name="status"
            id="status"
            options={SELECT_OPTIONS}
            text="statut"
          />
          <Button type="submit" text="Ajouter un lead" />
        </form>
        {errorMsg && (
          <div className="error-message" role="alert">
            {errorMsg}
          </div>
        )}
      </section>

      <section id="searchSection">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            type="text"
            name="search"
            id="search"
            value={query}
            placeholder="Search"
            onChange={handleChange}
            aria-label="Recherche"
          />
          <Select
            name="filter"
            options={["tous", ...SELECT_OPTIONS]}
            id="filter"
            value={filter}
            onChange={changeFilterHandler}
            aria-label="Filtrer par statut"
          />
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
      <ConsentBanner />
    </main>
  );
}

export default App;

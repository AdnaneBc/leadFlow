import { useState, type SubmitEvent } from "react";
import type { LeadType, LeadUpdates } from "../types/lead";



type LeadProps = {
  lead: LeadType;
  onDeleteLead: (id: number) => void;
  onUpdateLead: (id: number, updatedData: LeadUpdates) => void;
};
const Lead = ({ lead, onDeleteLead, onUpdateLead }: LeadProps) => {
  const [isEditing, setIsEditing] = useState(false);

  function modifyLead() {
    setIsEditing((isEditing) => !isEditing);
  }

  function submitUpdates(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName")?.toString().trim();
    const society = formData.get("society")?.toString().trim();
    const estimatedValue = Number(formData.get("estimatedValue"));
    if (
      !fullName ||
      !society ||
      !Number.isFinite(estimatedValue) ||
      estimatedValue <= 0
    )
      return;
    onUpdateLead(lead.id, { fullName, society, estimatedValue });
    setIsEditing(false);
  }
  return (
    <li className="Card">
      <p className="fullName">{lead.fullName.toUpperCase()}</p>
      <p>{lead.email}</p>
      <p>{lead.society}</p>
      <p>
        {lead.estimatedValue.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        })}{" "}
      </p>
      <p className={`badge badge-${lead.status}`}>{lead.status}</p>

      <div className="buttons">
        <button onClick={() => onDeleteLead(lead.id)}>
          {" "}
          Supprimer le lead
        </button>
        {lead.status.toLowerCase() !== "contacted" && (
          <button
            onClick={() => onUpdateLead(lead.id, { status: "contacted" })}
          >
            Marquer comme contacté
          </button>
        )}
        <button type="button" onClick={modifyLead}>
          {isEditing ? "Annuler" : "Modifier"}
        </button>
      </div>
      {isEditing && (
        <form onSubmit={submitUpdates}>
          <label htmlFor={`fullName-${lead.id}`}>Nom complet</label>
          <input
            id={`fullName-${lead.id}`}
            name="fullName"
            defaultValue={lead.fullName}
          />
          <label htmlFor={`society-${lead.id}`}>Entreprise</label>
          <input
            type="text"
            id={`society-${lead.id}`}
            name="society"
            defaultValue={lead.society}
          />

          <label htmlFor={`estimatedValue-${lead.id}`}>Valeur estimée</label>
          <input
            type="number"
            id={`estimatedValue-${lead.id}`}
            name="estimatedValue"
            defaultValue={lead.estimatedValue}
            step="any"
          />
          <button type="submit">Enregistrer</button>
        </form>
      )}
    </li>
  );
};

export default Lead;

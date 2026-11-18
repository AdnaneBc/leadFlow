import { useState, type SubmitEvent } from "react";
import type { LeadType, LeadUpdates } from "../types/lead";
import Button from "./ui/Button";
import Input from "./ui/Input";

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
        <Button
          variante="danger"
          onClick={() => onDeleteLead(lead.id)}
          text="Supprimer le lead"
        />

        {lead.status.toLowerCase() !== "contacted" && (
          <Button
            onClick={() => onUpdateLead(lead.id, { status: "contacted" })}
            text="Marquer comme contacté"
          />
        )}
        <Button
          type="button"
          onClick={modifyLead}
          text={isEditing ? "Annuler" : "Modifier"}
        />
      </div>
      {isEditing && (
        <form onSubmit={submitUpdates}>
          <Input
            type="text"
            name="fullName"
            text="Nom complet"
            defaultValue={lead.fullName}
            id={`fullName-${lead.id}`}
          />

          <Input
            type="text"
            id={`society-${lead.id}`}
            name="society"
            defaultValue={lead.society}
            text="Entreprise"
          />

          <Input
            type="number"
            id={`estimatedValue-${lead.id}`}
            name="estimatedValue"
            defaultValue={lead.estimatedValue}
            text="Valeur estimée"
            step="any"
          />

          <Button type="submit" text="Enregistrer" />
        </form>
      )}
    </li>
  );
};

export default Lead;

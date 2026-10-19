import type { LeadStatus, LeadType, LeadUpdates } from "../types/lead";

export function getQualifiedLeads(leads: LeadType[]): LeadType[] {
  // Utiliser filter
  return leads.filter((lead) => lead.status === "qualified");
}

export function searchLeads(leads: LeadType[], query: string): LeadType[] {
  // Rechercher dans fullName, email et society
  const normalizedQuery = query.toLowerCase().trim();
  return leads.filter((lead) => {
    // Vérifier si normalizedQuery est présent dans :
    if (
      lead.fullName.toLowerCase().includes(normalizedQuery) ||
      lead.email.toLowerCase().includes(normalizedQuery) ||
      lead.society.toLowerCase().includes(normalizedQuery)
    )
      return lead;
    if (normalizedQuery === "") return lead;
  });
}

export function getTotalPipelineValue(leads: LeadType[]): number {
  // Utiliser reduce
  return leads.reduce((prev, act) => prev + act.estimatedValue, 0);
}

export function getLeadById(
  leads: LeadType[],
  id: number,
): LeadType | undefined {
  // Utiliser find
  return leads.find((lead) => lead.id === id);
}

export function updateLeadStatus(
  leads: LeadType[],
  id: number,
  status: LeadStatus,
): LeadType[] {
  // Utiliser map sans modifier le tableau original
  return leads.map((lead) => {
    if (lead.id === id) return { ...lead, status };
    return lead;
  });
}

export function updateLead(
  leads: LeadType[],
  id: number,
  updates: LeadUpdates,
): LeadType[] {
  // Fusionner le lead existant avec updates
  return leads.map((lead) => {
    if (lead.id === id) return { ...lead, ...updates };
    return lead;
  });
}

export function getLeadByStatus(leads: LeadType[], status: string) {
  return leads.filter((lead) => lead.status === status);
}

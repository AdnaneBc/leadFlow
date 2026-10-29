export type LeadStatus = "new" | "contacted" | "qualified" | "won" | "lost";
export type leadsFilterByStatus = LeadStatus | "tous";
export type LeadType = {
  id: number;
  fullName: string;
  email: string;
  society: string;
  estimatedValue: number;
  status: LeadStatus;
};

export type LeadUpdates = Partial<Omit<LeadType, "id">>;

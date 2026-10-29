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

// export const sampleLeads: LeadType[] = [
//   {
//     id: 1,
//     fullName: "Karim Dupont",
//     email: "karim.dupont@example.com",
//     society: "Atlas Digital",
//     estimatedValue: 4500,
//     status: "qualified",
//   },
//   {
//     id: 2,
//     fullName: "Sophie Dupuis",
//     email: "sophie.dupuis@example.com",
//     society: "Nova Conseil",
//     estimatedValue: 3200,
//     status: "qualified",
//   },
//   {
//     id: 3,
//     fullName: "Yassine El Amrani",
//     email: "yassine.elamrani@example.com",
//     society: "Casa Shop",
//     estimatedValue: 1800,
//     status: "new",
//   },
//   {
//     id: 4,
//     fullName: "Julie Martin",
//     email: "julie.martin@example.com",
//     society: "Bleu Marine SAS",
//     estimatedValue: 2500,
//     status: "new",
//   },
//   {
//     id: 5,
//     fullName: "Omar Benali",
//     email: "omar.benali@example.com",
//     society: "Rabat Food",
//     estimatedValue: 1200,
//     status: "contacted",
//   },
//   {
//     id: 6,
//     fullName: "Claire Dupré",
//     email: "claire.dupre@example.com",
//     society: "Lumen Studio",
//     estimatedValue: 6000,
//     status: "contacted",
//   },
//   {
//     id: 7,
//     fullName: "Mehdi Tazi",
//     email: "mehdi.tazi@example.com",
//     society: "Tanger Logistique",
//     estimatedValue: 9800,
//     status: "won",
//   },
//   {
//     id: 8,
//     fullName: "Laura Petit",
//     email: "laura.petit@example.com",
//     society: "Petit & Fils",
//     estimatedValue: 3700,
//     status: "won",
//   },
//   {
//     id: 9,
//     fullName: "Nadia Chraibi",
//     email: "nadia.chraibi@example.com",
//     society: "Fès Immobilier",
//     estimatedValue: 5400,
//     status: "lost",
//   },
//   {
//     id: 10,
//     fullName: "Thomas Leroy",
//     email: "thomas.leroy@example.com",
//     society: "Leroy Analytics",
//     estimatedValue: 2100,
//     status: "lost",
//   },
// ];

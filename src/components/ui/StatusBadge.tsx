import type { LeadStatus } from "../../types/lead";

type StatusBadgeProps = { leadStatus: LeadStatus };

export default function StatusBadge({ leadStatus }: StatusBadgeProps) {
  return <p className={`badge badge-${leadStatus}`}>{leadStatus}</p>;
}

import type { ServiceStatus } from "@status-board/shared";
import { getStatusLabel, statusStyles } from "../utils/status";

type StatusPillProps = {
  status: ServiceStatus["status"];
};

export const StatusPill = ({ status }: StatusPillProps) => (
  <span className={`text-sm font-medium ${statusStyles[status].label}`}>
    {getStatusLabel(status)}
  </span>
);

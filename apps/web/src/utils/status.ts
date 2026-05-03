import { StatusLabels, type ServiceStatus } from "@status-board/shared";

export const statusStyles = {
  online: {
    dot: "bg-emerald-400",
    label: "text-emerald-300",
  },
  degraded: {
    dot: "bg-amber-300",
    label: "text-amber-200",
  },
  offline: {
    dot: "bg-red-400",
    label: "text-red-300",
  },
} as const;

export const getStatusLabel = (status: ServiceStatus["status"]) =>
  StatusLabels[status];

export const formatCheckedAt = (checkedAt: string) =>
  new Date(checkedAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatResponseTime = (responseTimeMs: number | null) =>
  responseTimeMs === null ? "-" : `${responseTimeMs}ms`;

export const getServiceDomain = (url: string) => new URL(url).hostname;

export const getLatestCheckedAt = (services: ServiceStatus[]) => {
  const latestTimestamp = Math.max(
    ...services.map((service) => new Date(service.checkedAt).getTime()),
  );

  return Number.isFinite(latestTimestamp)
    ? formatCheckedAt(new Date(latestTimestamp).toISOString())
    : "--:--";
};

export const countServicesByStatus = (
  services: ServiceStatus[],
  status: ServiceStatus["status"],
) => services.filter((service) => service.status === status).length;

import type { ServiceStatus } from "@status-board/shared";

export type MonitoredService = Pick<ServiceStatus, "id" | "name" | "url">;

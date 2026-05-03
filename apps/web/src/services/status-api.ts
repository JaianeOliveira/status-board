import type { ServiceStatus } from "@status-board/shared";

export const fetchServiceStatus = async (): Promise<ServiceStatus[]> => {
  const response = await fetch("http://localhost:3333/services/status");

  if (!response.ok) {
    throw new Error("Failed to fetch service status");
  }

  return response.json();
};

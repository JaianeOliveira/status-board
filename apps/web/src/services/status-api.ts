import type { ServiceStatus } from "@status-board/shared";

export const fetchServiceStatus = async (): Promise<ServiceStatus[]> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/services/status`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch service status");
  }

  return response.json();
};

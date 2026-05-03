import type { FastifyBaseLogger } from "fastify";
import type { ServiceStatus } from "@status-board/shared";
import { serviceMonitorConfig } from "../config/monitored-services.js";
import type { MonitoredService } from "../types/services.js";

export const checkServiceStatus = async (
  service: MonitoredService,
  logger: FastifyBaseLogger,
): Promise<ServiceStatus> => {
  const checkedAt = new Date().toISOString();
  const startedAt = performance.now();

  try {
    const response = await fetch(service.url, {
      method: "HEAD",
      signal: AbortSignal.timeout(serviceMonitorConfig.requestTimeoutMs),
    });

    const responseTimeMs = Math.round(performance.now() - startedAt);
    const status =
      response.ok || response.status < 400
        ? responseTimeMs > serviceMonitorConfig.degradedThresholdMs
          ? "degraded"
          : "online"
        : "offline";

    return {
      ...service,
      status,
      responseTimeMs,
      checkedAt,
    };
  } catch (error) {
    logger.warn({ err: error, serviceId: service.id }, "Service check failed");

    return {
      ...service,
      status: "offline",
      responseTimeMs: null,
      checkedAt,
    };
  }
};

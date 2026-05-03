import { z } from "zod";

export const serviceStatusSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.url(),
  status: z.enum(["online", "offline", "degraded"]),
  responseTimeMs: z.number().nullable(),
  checkedAt: z.string(),
});

export type ServiceStatus = z.infer<typeof serviceStatusSchema>;

export const StatusLabels = {
  online: "Online",
  offline: "Offline",
  degraded: "Degradado",
} as const;

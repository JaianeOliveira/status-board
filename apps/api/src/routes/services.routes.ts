import type { FastifyInstance } from "fastify";
import { monitoredServices } from "../config/monitored-services.js";
import { checkServiceStatus } from "../services/service-monitor.js";

export const registerServicesRoutes = async (app: FastifyInstance) => {
  app.get("/services/status", async () => {
    return Promise.all(
      monitoredServices.map((service) => checkServiceStatus(service, app.log)),
    );
  });
};

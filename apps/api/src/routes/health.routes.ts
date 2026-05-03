import type { FastifyInstance } from "fastify";

export const registerHealthRoutes = async (app: FastifyInstance) => {
  app.get("/health", async () => {
    return {
      status: "ok",
      service: "api",
      checkedAt: new Date().toISOString(),
    };
  });
};

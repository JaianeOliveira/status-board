import type { ServiceStatus } from "@status-board/shared";
import { StatusItem } from "./status-item";

type StatusListProps = {
  services: ServiceStatus[];
};

export const StatusList = ({ services }: StatusListProps) => (
  <section className="grid gap-3" aria-label="Serviços monitorados">
    <div className="grid gap-3">
      {services.map((service) => (
        <StatusItem key={service.id} service={service} />
      ))}
    </div>
  </section>
);

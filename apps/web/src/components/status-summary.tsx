import type { ServiceStatus } from "@status-board/shared";
import {
  countServicesByStatus,
  getStatusLabel,
  statusStyles,
} from "../utils/status";

type StatusSummaryProps = {
  isLoading?: boolean;
  services: ServiceStatus[];
};

const summaryStatuses: ServiceStatus["status"][] = [
  "online",
  "degraded",
  "offline",
];

export const StatusSummary = ({
  isLoading = false,
  services,
}: StatusSummaryProps) => (
  <section
    aria-label="Resumo dos serviços"
    className="grid gap-3 sm:grid-cols-3"
  >
    {summaryStatuses.map((status) => {
      const count = countServicesByStatus(services, status);

      return (
        <div
          className="rounded-[18px] border border-white/25 bg-transparent px-4 py-4 transition-colors hover:border-violet-300/50"
          key={status}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-neutral-300">
              {getStatusLabel(status)}
            </p>
            <span
              className={`h-2 w-2 rounded-full ${statusStyles[status].dot}`}
            />
          </div>
          {isLoading ? (
            <div className="mt-4 h-10 w-16 animate-pulse rounded-lg bg-white/8" />
          ) : (
            <>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-neutral-50">
                {count}
              </p>
              <p className="mt-1 text-xs text-neutral-500">
                {count === 1 ? "serviço" : "serviços"}
              </p>
            </>
          )}
        </div>
      );
    })}
  </section>
);

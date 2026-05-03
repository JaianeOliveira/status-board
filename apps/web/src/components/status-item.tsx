import type { ServiceStatus } from "@status-board/shared";
import {
  formatResponseTime,
  getServiceDomain,
  statusStyles,
} from "../utils/status";
import { StatusPill } from "./status-pill";

type StatusItemProps = {
  service: ServiceStatus;
};

export const StatusItem = ({ service }: StatusItemProps) => (
  <a
    className="block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
    target="_blank"
    href={service.url}
    rel="noopener noreferrer"
  >
    <article className="grid gap-4 rounded-lg border border-zinc-800 bg-transparent px-4 py-4 transition-colors hover:border-violet-400/30 hover:bg-zinc-900/30 sm:px-5 md:grid-cols-[minmax(0,1fr)_8rem_6rem] md:items-center">
      <div className="min-w-0">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${statusStyles[service.status].dot}`}
          />
          <h3 className="truncate text-sm font-semibold text-neutral-100">
            {service.name}
          </h3>
        </div>
        <p className="mt-1 truncate pl-5 text-sm text-neutral-500">
          {getServiceDomain(service.url)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/70 pt-4 md:contents">
        <div className="min-w-0 md:text-right">
          <p className="mb-1 text-xs text-neutral-500 md:sr-only">Estado</p>
          <StatusPill status={service.status} />
        </div>

        <div className="min-w-0 text-right">
          <p className="mb-1 text-xs text-neutral-500 md:sr-only">Latência</p>
          <p className="font-mono text-sm text-neutral-200">
            {formatResponseTime(service.responseTimeMs)}
          </p>
        </div>
      </div>
    </article>
  </a>
);

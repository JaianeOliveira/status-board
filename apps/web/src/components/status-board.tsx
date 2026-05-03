import type { ServiceStatus } from "@status-board/shared";
import { useEffect, useState } from "react";
import { fetchServiceStatus } from "../services/status-api";
import { getLatestCheckedAt } from "../utils/status";
import { LoadingState } from "./loading-state";
import { StatusList } from "./status-list";

type RequestState =
  | { status: "loading"; services: ServiceStatus[] }
  | { status: "success"; services: ServiceStatus[] }
  | { status: "error"; services: ServiceStatus[] };

export const StatusBoard = () => {
  const [requestState, setRequestState] = useState<RequestState>({
    status: "loading",
    services: [],
  });

  const loadServices = async () => {
    setRequestState((currentState) => ({
      status: "loading",
      services: currentState.services,
    }));

    try {
      const services = await fetchServiceStatus();
      setRequestState({ status: "success", services });
    } catch {
      setRequestState((currentState) => ({
        status: "error",
        services: currentState.services,
      }));
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetchServiceStatus()
      .then((services) => {
        if (isMounted) {
          setRequestState({ status: "success", services });
        }
      })
      .catch(() => {
        if (isMounted) {
          setRequestState({ status: "error", services: [] });
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalServices = requestState.services.length;
  const isLoadingWithoutData =
    requestState.status === "loading" && totalServices === 0;
  const latestCheckedAt = getLatestCheckedAt(requestState.services);
  const monitorState =
    requestState.status === "error"
      ? "API indisponível"
      : requestState.status === "loading"
        ? "Verificando"
        : "Ao vivo";

  return (
    <main className="min-h-screen bg-zinc-900 px-4 py-6 text-zinc-100 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl content-center">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950/50 px-5 py-7 shadow-sm sm:px-8">
          <header className="pb-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                  <span className="inline-flex items-center gap-2 text-violet-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {monitorState}
                  </span>
                  <span>{totalServices} pontos monitorados</span>
                  <span>Última sincronização {latestCheckedAt}</span>
                </div>

                <h1 className="mt-2 max-w-3xl text-3xl font-bold text-zinc-50 sm:text-4xl">
                  Painel de Status
                </h1>
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <a
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-zinc-600 bg-transparent px-4 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-violet-300/70 hover:text-violet-100"
                  href="https://linkedin.com/in/jaianeoliveira"
                  rel="noreferrer"
                  target="_blank"
                >
                  @jaianeoliveira
                </a>
                <button
                  className="cursor-pointer inline-flex h-10 items-center justify-center rounded-lg bg-violet-500 hover:bg-violet-500/70 px-5 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={requestState.status === "loading"}
                  onClick={loadServices}
                  type="button"
                >
                  {requestState.status === "loading"
                    ? "Verificando"
                    : "Atualizar"}
                </button>
              </div>
            </div>
          </header>

          <div className="grid gap-4">
            {requestState.status === "error" && (
              <div className="rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-200">
                Não foi possível carregar os status. Verifique se a API está
                rodando.
              </div>
            )}

            {isLoadingWithoutData ? (
              <LoadingState />
            ) : (
              <StatusList services={requestState.services} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

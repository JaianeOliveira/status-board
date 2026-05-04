# Status Board

Painel simples para acompanhar a disponibilidade de projetos e serviços. A API verifica URLs monitoradas e a interface exibe o status atual, tempo de resposta e data da última checagem.

## Stack

- **Monorepo:** PNPM Workspaces
- **Web:** React, Vite, TypeScript e Tailwind CSS
- **API:** Fastify e TypeScript
- **Shared:** Zod para tipos e schemas compartilhados
- **Deploy:** Docker Compose em EC2, com Nginx servindo o build web

## Estrutura

```txt
.
├── apps
│   ├── api       # API Fastify
│   └── web       # Interface React
├── packages
│   └── shared    # Tipos e schemas compartilhados
├── docker-compose.yml
└── pnpm-workspace.yaml
```

## Configuração

Crie o `.env` na raiz:

```bash
cp .env.example .env
```

Exemplo:

```env
API_PORT=3333
WEB_PORT=80
VITE_API_URL=http://localhost:3333
```

Para rodar o web fora do Docker, crie também `apps/web/.env`:

```env
VITE_API_URL=http://localhost:3333
```

## Rodando Localmente

```bash
pnpm install
pnpm dev
```

URLs padrão:

- API: `http://localhost:3333`
- Web: `http://localhost:5173`

## Rodando com Docker

```bash
docker compose up --build
```

URLs padrão:

- API: `http://localhost:3333`
- Web: `http://localhost`

## Deploy na EC2

Na EC2, configure o `.env` com a URL pública da API:

```env
API_PORT=3333
WEB_PORT=80
VITE_API_URL=http://SEU_IP_PUBLICO_OU_DOMINIO:3333
```

Suba os containers:

```bash
docker compose up --build -d
```

Comandos úteis:

```bash
docker compose logs -f
docker compose ps
docker compose down
```

Para atualizar o deploy:

```bash
git pull
docker compose up --build -d
```

No Security Group da EC2, libere as portas usadas pelo projeto, normalmente `80` para o web e `3333` para a API.

## Scripts

```bash
pnpm dev        # inicia web e API
pnpm dev:web    # inicia apenas o web
pnpm dev:api    # inicia apenas a API
pnpm build      # build dos workspaces
```

## Endpoints

```txt
GET /health
GET /services/status
```

`GET /services/status` retorna os serviços monitorados com status, tempo de resposta e data da verificação.

Status possíveis:

- `online`: respondeu dentro do esperado
- `degraded`: respondeu, mas passou do limite definido
- `offline`: falhou, demorou demais ou retornou erro

## Serviços Monitorados

A lista de serviços fica em:

```txt
apps/api/src/config/monitored-services.ts
```

Exemplo:

```ts
{
  id: "meu-servico",
  name: "Meu Serviço",
  url: "https://exemplo.com",
}
```

No mesmo arquivo também ficam as configurações de monitoramento:

```ts
requestTimeoutMs: 5_000
degradedThresholdMs: 1_000
```

# Status Board

Status Board é um painel para acompanhar a disponibilidade de projetos e serviços. A API verifica URLs monitoradas e a interface exibe o status atual, tempo de resposta e data da última checagem.

Acesse aqui: [status.jaianeoliveira.com](http://status.jaianeoliveira.com)

## Stack

- **Monorepo:** PNPM Workspaces
- **Web:** React, Vite, TypeScript e Tailwind CSS
- **API:** Fastify e TypeScript
- **Shared:** Zod para tipos e schemas compartilhados

## Infra

- Docker Compose
- Nginx servindo o build web
- API e web rodando em containers
- Deploy em uma instância EC2

## Licença

Este projeto está licenciado sob a licença MIT.

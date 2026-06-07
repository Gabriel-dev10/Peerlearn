# PeerLearn

Plataforma universitária onde **alunos ensinam alunos** através de micro-aulas, trilhas de
conhecimento e gamificação com XP e badges.

> Projeto desenvolvido para demonstrar, de forma prática e justificada: Clean Code, SOLID,
> Design Patterns, TDD, BDD, Arquitetura Limpa, Microsserviços, Docker e deploy em nuvem.

---

## Acesso ao sistema (deploy ativo)

> **Aplicação publicada e funcionando** — o deploy foi feito pelo próprio autor
> (Vercel para o frontend, Render para os microsserviços e Neon para o banco PostgreSQL).

| O quê | Link |
|---|---|
| **Aplicação (use por aqui)** | **https://peerlearn-beta.vercel.app/login** |
| API auth (Swagger) | `https://peerlearn-auth.onrender.com/docs` |
| API content (Swagger) | `https://peerlearn-content.onrender.com/docs` |
| API reputation (Swagger) | `https://peerlearn-reputation.onrender.com/docs` |

O usuário acessa **apenas a aplicação web** (primeira linha). Os três microsserviços rodam
**por trás, de forma transparente** — o frontend os consome via HTTP sem que o usuário precise
saber que existem. Os links de Swagger acima são apenas para inspeção técnica/avaliação.

> ℹ️ Os serviços do Render (plano gratuito) hibernam após ~15 min de inatividade; o **primeiro**
> acesso pode levar ~30-50s para "acordar".

---

## 1. Problema e proposta de solução

**Problema:** dentro da universidade, o conhecimento técnico fica preso em indivíduos. O aluno
que domina Docker, Git ou Clean Architecture não tem um canal formal para compartilhar isso com
a turma. O resultado é retrabalho, dúvidas repetidas e conhecimento que se perde a cada semestre.

**Solução:** o PeerLearn permite que qualquer aluno publique **micro-aulas** (vídeo, texto ou
quiz), organize-as em **trilhas** e receba **comentários**. Quem ensina ganha **XP** e desbloqueia
**badges**, e um **ranking** incentiva a participação. Quando uma aula é publicada, os colegas
inscritos são **notificados** automaticamente.

---

## 2. Divisão em microsserviços

O backend é dividido em **3 microsserviços independentes** (cada um com seu próprio código,
banco e deploy), consumidos por **1 aplicação web** que os integra de forma transparente:

| Microsserviço | Porta | Responsabilidade | Banco | Pasta |
|---|---|---|---|---|
| **auth-service** | 3001 | Registro, login, JWT, papéis e perfil | PostgreSQL | `peerlearn-back/auth-service` |
| **content-service** | 3003 | Aulas, trilhas, comentários e notificações | PostgreSQL | `peerlearn-back/content-service` |
| **reputation-service** | 3004 | XP, badges e ranking | PostgreSQL | `peerlearn-back/reputation-service` |
| **peerlearn-front** (web) | 5173 | Interface única que consome os 3 serviços | — | `peerlearn-front` |

**Transparência para o usuário:** quem usa o sistema acessa **um único site** (o frontend). Ele
não percebe que existem 3 serviços — o React chama cada API (auth, content, reputation) nos
bastidores e monta uma experiência única. Cada serviço é **independente** (próprio banco, próprio
deploy, escalável separadamente). A comunicação entre eles é mínima: ao publicar uma aula, o
`content-service` chama o `reputation-service` via HTTP para conceder XP ao autor.

```
              ┌────────────┐
   Browser ──▶│  Frontend  │ (React + Vite, Vercel)
              └─────┬──────┘
        ┌───────────┼───────────────┐
        ▼           ▼               ▼
   ┌────────┐  ┌─────────┐    ┌────────────┐
   │  auth  │  │ content │───▶│ reputation │   (HTTP: XP ao publicar)
   └───┬────┘  └────┬────┘    └─────┬──────┘
       ▼            ▼               ▼
   Postgres     Postgres        Postgres        (Neon em produção)
```

### Estrutura do repositório (monorepo)

O backend e o frontend ficam **juntos em um único repositório** (monorepo). Isso facilita o
versionamento e o deploy, mas cada parte continua **independente** — tem seu próprio
`package.json`, seu próprio build e seu próprio deploy (os serviços vão para o Render e o
frontend para a Vercel, a partir do mesmo repositório).

```
PeerLearn/                        ← repositório único
├── peerlearn-back/               ← BACKEND (3 microsserviços NestJS)
│   ├── auth-service/             ← porta 3001
│   ├── content-service/          ← porta 3003
│   └── reputation-service/       ← porta 3004
├── peerlearn-front/              ← FRONTEND (React + Vite)
├── docker/postgres/init.sql      ← cria os bancos por serviço
├── docker-compose.yml            ← sobe Postgres + os 3 serviços localmente
├── render.yaml                   ← blueprint de deploy do backend (Render)
└── README.md
```

Cada microsserviço segue a mesma organização interna (Clean Architecture):
`src/domain`, `src/application`, `src/infrastructure`.

---

## 3. Stack

| Camada | Tecnologia |
|---|---|
| Runtime | Bun |
| Backend | NestJS + TypeScript |
| Frontend | React + Vite + TypeScript + TanStack Query |
| ORM | Prisma |
| Banco | PostgreSQL |
| Testes | `bun test` (unit) + Cucumber.js (BDD) |
| Lint/format | Biome |
| Containers | Docker + Docker Compose |
| Deploy | Render (back) + Vercel (front) + Neon (banco) |

---

## 4. Arquitetura Limpa

Cada serviço segue a mesma organização em camadas:

```
src/
├── domain/          # Núcleo: entidades, regras e interfaces de repositório (sem framework)
├── application/     # Casos de uso (orquestram o domínio) + ports (interfaces)
├── infrastructure/  # Implementações: Prisma, HTTP (NestJS), gateways, listeners
└── main.ts
```

**Regra de dependência:** `domain` não importa nada de `application`, `infrastructure` ou de
frameworks. As dependências sempre apontam para dentro. Os casos de uso dependem de **interfaces**
(ports), nunca de implementações concretas.

---

## 5. Princípios SOLID

- **S (Single Responsibility):** cada caso de uso faz uma única coisa
  (`PublishLessonUseCase`, `AwardXpUseCase`, `LoginUseCase`).
- **O (Open/Closed):** novas formas de pontuar XP entram como novas `XpStrategy` sem alterar o
  código existente.
- **L (Liskov):** os repositórios Prisma substituem as interfaces de domínio sem quebrar os casos
  de uso (provado nos testes, que injetam implementações em memória).
- **I (Interface Segregation):** interfaces específicas por contexto (`ILessonRepository`,
  `IScoreRepository`, `IEventPublisher`, `ISubscriberProvider`).
- **D (Dependency Inversion):** casos de uso recebem interfaces; as implementações concretas são
  amarradas via `useFactory` nos módulos NestJS (ex.: `auth.module.ts`, `content.module.ts`).

---

## 6. Design Patterns (5)

| Padrão | Onde | Arquivo |
|---|---|---|
| **Repository** | acesso a dados desacoplado | `*/domain/repositories/*.repository.ts` + `infrastructure/database/prisma-*.repository.ts` |
| **Factory** | criação de conteúdo por tipo (vídeo/texto/quiz) | `content-service/src/domain/factories/content.factory.ts` |
| **Strategy** | cálculo de XP por ação | `reputation-service/src/domain/strategies/xp.strategy.ts` |
| **Decorator** | badges acrescentados ao nome do perfil | `reputation-service/src/domain/decorators/badge.decorator.ts` |
| **Observer** | publicar aula → notificar inscritos (in-process via EventEmitter) | `content-service/src/infrastructure/messaging/*.listener.ts` |

---

## 7. Evidências de Clean Code

- Nomes claros e em português no domínio do negócio (ex.: `NotifySubscribersUseCase`).
- Funções pequenas e com responsabilidade única; sem comentários supérfluos.
- Erros de domínio explícitos (`InvalidEmailError`, `LessonNotFoundError`) mapeados para HTTP por
  um único `DomainExceptionFilter` por serviço.
- Padrão consistente entre os 3 serviços (mesma estrutura de pastas e de DI).
- Formatação e lint automatizados com **Biome** (`bun run lint`).

---

## 8. TDD — testes unitários

Os testes foram escritos **antes** da implementação dos casos de uso, com repositórios em memória
(sem banco real). São **37 testes unitários** cobrindo entidades, factory, strategies, decorator e
todos os casos de uso.

```bash
# em cada serviço
bun test
```

---

## 9. BDD — cenários Gherkin

Cada serviço tem cenários `.feature` (Cucumber.js) em português. Exemplo
(`content-service/features/publish-lesson.feature`):

```gherkin
Funcionalidade: Publicação de micro-aula
  Cenário: Ao publicar uma aula, os outros alunos são notificados
    Dado que os alunos inscritos são "s1,s2" e o autor é "autor"
    Quando o autor publica uma micro-aula "Docker Compose"
    Então os alunos "s1,s2" recebem uma notificação
    E o autor não recebe notificação
```

```bash
# em cada serviço
bun run test:bdd
```

---

## 10. Como rodar localmente

### Opção A — Docker Compose (tudo de uma vez)

```bash
docker compose up --build
# Postgres + auth (3001) + content (3003) + reputation (3004)
```

Cada serviço aplica o schema no banco (`prisma db push`) ao subir.

### Opção B — Bun (desenvolvimento)

```bash
# 1. Banco
docker compose up -d postgres

# 2. Dependências (na raiz do backend)
cd peerlearn-back && bun install

# 3. Gerar Prisma Client e aplicar schema (em cada serviço Prisma)
cd auth-service && bunx prisma generate && bunx prisma db push && bun run start:dev
# (repita para content-service e reputation-service)

# 4. Frontend
cd peerlearn-front && bun install && bun run dev
```

Documentação Swagger de cada serviço em `/docs` (ex.: http://localhost:3001/docs).

---

## 11. Deploy (gratuito)

- **Banco:** criar um projeto no [Neon](https://neon.tech) e 3 bancos
  (`peerlearn_auth`, `peerlearn_content`, `peerlearn_reputation`). Copiar as connection strings.
- **Backend:** no [Render](https://render.com), usar o `render.yaml` (Blueprint) — cria os 3 Web
  Services Docker. Definir `DATABASE_URL` de cada um, `JWT_SECRET` (auth) e `REPUTATION_SERVICE_URL`
  (content, apontando para a URL pública do reputation).
- **Frontend:** no [Vercel](https://vercel.com), importar `peerlearn-front` e definir
  `VITE_AUTH_URL`, `VITE_CONTENT_URL`, `VITE_REPUTATION_URL` com as URLs do Render.

> Observação técnica: os Web Services gratuitos do Render hibernam após ~15 min de inatividade
> (cold start de alguns segundos no primeiro acesso) — aceitável para demonstração.

### Links do sistema publicado

Veja a seção **🔗 Acesso ao sistema** no topo deste README.

---

## 12. Variáveis de ambiente

| Serviço | Variáveis |
|---|---|
| auth | `PORT`, `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN` |
| content | `PORT`, `DATABASE_URL`, `DEMO_SUBSCRIBERS`, `REPUTATION_SERVICE_URL` |
| reputation | `PORT`, `DATABASE_URL` |
| frontend | `VITE_AUTH_URL`, `VITE_CONTENT_URL`, `VITE_REPUTATION_URL` |

Cada serviço tem um `.env.example` de referência.

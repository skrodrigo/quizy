# Quizy — Frontend e Mapa do Micro SaaS

Plataforma de quizzes inteligentes para geração e qualificação de leads a partir de textos, prompts ou uploads. 

## Visão Geral
- **Objetivo**: permitir que times de marketing criem quizzes rapidamente e capturem/qualifiquem leads.
- **MVP**: geração de quiz via IA, execução do quiz, captura de lead com persistência no banco e dashboard básico.

## Stack de Tecnologias

 - **Frontend**
   - Next.js 15 (App Router, Server Actions)
   - React 19 + TypeScript
   - Tailwind CSS + shadcn/ui
   - TanStack Query (server state)
   - React Hook Form + Zod (forms/validação)
   - Zustand (estado local simples – opcional)
   - ESLint + Prettier
   - Vitest + Testing Library + Playwright (tests)
   - npm (gerenciador de pacotes)

- **Backend/Infra (contexto do micro SaaS)**
  - API: Next.js Route Handlers + Server Actions (Node runtime)
  - Banco: Neon
  - ORM: Prisma
  - Auth: Better auth
  - Emails: Resend
  - Pagamentos: Stripe
  - Analytics/Feature Flags: PostHog
  - CI/CD: GitHub Actions; Deploy: AWS 


## Fluxos principais
- **Geração do Quiz**: prompt/texto → LLM (OpenAI) → validação Zod → persistência (Postgres) → retorno para UI.
- **Execução do Quiz**: renderização reativa, salvamento de progresso local (opcional), submissão com feedback.
- **Captura de Lead**: submissão → DB → evento → worker envia e-mails via SES.
- **Métricas**: eventos PostHog no FE + contadores agregados no DB.

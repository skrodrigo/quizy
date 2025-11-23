# funilead

## Visão Geral
- **Objetivo**: permitir que times de marketing criem quizzes rapidamente e capturem/qualifiquem leads.
- **MVP**: geração e criação de quiz e/ou via IA, execução do quiz, captura de lead com persistência no banco e dashboard básico.

## Stack de Tecnologias

 - **Frontend**
   - Next.js 15 (App Router, Server Actions)
   - React 19 + TypeScript
   - Tailwind CSS + shadcn/ui
   - TanStack Query (server state)
   - React Hook Form + Zod 
   - Biome

- **Backend/Infra (contexto do micro SaaS)**
  - API: Next.js Route Handlers + Server Actions (Node runtime)
  - ORM: Prisma
  - Auth: Better auth
  - Emails: Resend
  - Pagamentos: Stripe


# 🚀 Cavrix AI

**Powered by Shivam**

A complete, premium, production-quality AI platform inspired by modern conversational AI interfaces. Built with Next.js, TypeScript, Tailwind CSS, and Prisma.

---

## ✨ Features

### 💬 Chat System
- Streaming AI responses
- Markdown rendering with syntax-highlighted code blocks
- Copy/regenerate/like/dislike/edit/delete messages
- Auto-generated conversation titles
- Conversations grouped by Today / Yesterday / Previous 7 Days / Older
- Infinite chat history with auto-save

### 🧠 AI Models
- **Cavrix Lite** — Fast, free, basic reasoning
- **Cavrix Pro** — Advanced reasoning, coding, image understanding
- **Cavrix Ultra** — Maximum intelligence, deep reasoning
- **Cavrix Vision** — Image & document analysis
- **Cavrix Code** — Specialized programming model
- **Cavrix Research** — Web research & source analysis

### 🎯 Feature Modules
- Deep Research with sources & citations
- Web Search
- Image Generation (aspect ratio, style, quality)
- Image Analysis
- File Analysis (PDF, DOCX, TXT, CSV, JSON, code)
- Code Assistant (generate/debug/explain/optimize/convert)
- Canvas / Workspace with HTML preview
- Voice Mode with animated waveform
- Custom AI Agents

### 📁 Projects
- Create, organize, and manage projects
- Upload files, store conversations, add instructions

### 🔎 Global Search
- Search conversations, messages, projects, files, agents
- **Ctrl + K** command palette

### 💳 Billing & Subscriptions
- Free / Plus (₹499) / Pro (₹999) / Business (Custom)
- Stripe & Razorpay architecture
- Payment history and invoice downloads

### 👤 Account & Settings
- Email + Google + GitHub auth
- Profile management, password reset, email verification
- Appearance, personalization, notifications, security

### 👑 Admin Panel
- Dashboard with usage analytics
- User management, subscriptions, AI usage, system controls

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| UI | shadcn/ui patterns, Lucide Icons, Framer Motion |
| Backend | Next.js API routes, Server Actions |
| Database | PostgreSQL with Prisma ORM |
| Auth | Auth.js (NextAuth) |
| AI | OpenAI, Anthropic, Google (pluggable provider layer) |
| Payments | Stripe, Razorpay |
| Storage | S3-compatible (architecture) |

---

## 📦 Installation

### Prerequisites
- Node.js 18.17+
- PostgreSQL (or a database URL)

### Steps

```bash
# 1. Clone and install
git clone <your-repo-url>
cd cavrix-ai
npm install

# 2. Configure environment variables
cp .env.example .env
# Edit .env and fill in your DATABASE_URL, NEXTAUTH_SECRET, AI keys, etc.

# 3. Set up the database
npx prisma generate
npx prisma db push
# Optional: seed demo data
npm run db:seed

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Accounts (after seeding)
| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@cavrix.ai` | `admin123` |
| User | `user@cavrix.ai` | `user123` |

---

## 🔑 Environment Variables

See `.env.example` for the full list:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cavrix_ai
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

AI_PROVIDER=openai
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_AI_API_KEY=

STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

API keys are **never** exposed to the client — all AI, payment, and database calls go through secure server-side API routes.

---

## 🗄️ Database Models

- **Users, Accounts, Sessions** — Auth.js compatible
- **Conversations, Messages** — chat history
- **Projects, Files** — file organization
- **Agents** — custom AI agents
- **Subscriptions, Payments** — billing
- **UsageRecords** — usage tracking
- **UserSettings** — user preferences

---

## 📂 Project Structure

```
cavrix-ai/
├── app/                 # App Router pages & API routes
│   ├── (auth)/          # Login, signup, password reset
│   ├── (dashboard)/     # Chat, projects, agents, billing, admin
│   └── api/             # REST API routes
├── components/          # UI components
│   ├── ui/              # Primitives
│   ├── chat/            # Chat interface
│   ├── landing/         # Marketing page
│   └── ...
├── context/             # Zustand stores, providers
├── lib/                 # Auth, prisma, utils
├── services/            # AI, payments, storage
├── prisma/              # Schema & seed
├── public/              # Static assets
└── types/               # TypeScript types & constants
```

---

## 🔌 AI Provider Architecture

The app uses a pluggable AI provider layer (`services/ai/provider.ts`). Set `AI_PROVIDER` and the corresponding API key in `.env` to switch providers without touching the frontend.

Providers supported:
- OpenAI (default)
- Anthropic
- Google AI
- Custom API endpoint (extend `provider.ts`)

---

## 🔐 Security

- Server-side API keys (never exposed to client)
- Rate limiting ready
- Input validation with Zod
- Auth.js session management
- Password hashing with bcrypt
- Role-based access control (admin panel)
- File upload validation
- GET/POST with CSRF protection via NextAuth

---

## 🧑‍💻 Development

```bash
npm run dev          # start dev server
npm run build        # production build
npm run start        # start production server
npm run lint         # lint
npm run db:studio    # Prisma Studio
```

---

## 📄 License

© 2024 Shivam — Cavrix AI. All rights reserved.
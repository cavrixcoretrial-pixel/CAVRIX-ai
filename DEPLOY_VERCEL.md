# Cavrix AI — Vercel Deployment

## 1. Database
Create a PostgreSQL database and set `DATABASE_URL` in Vercel.

## 2. Required environment variables
Set at least:
- DATABASE_URL
- NEXTAUTH_URL (your production Vercel URL)
- NEXTAUTH_SECRET
- OPENAI_API_KEY (if using OpenAI models)
- ANTHROPIC_API_KEY (if using Anthropic models)
- GOOGLE_AI_API_KEY (if using Google models)

Add Stripe/Razorpay/OAuth/S3 variables only if those features are enabled.

## 3. Vercel settings
Framework: Next.js
Install command: `npm install`
Build command: `npm run vercel-build`

The Vercel build generates Prisma Client, pushes the Prisma schema, and builds Next.js.

## 4. Local verification
```bash
npm install
cp .env.example .env.local
# edit .env.local
npx prisma generate
npx prisma db push
npm run build
npm run dev
```

## 5. Seed data (optional)
```bash
npm run db:seed
```

Demo seed credentials are included in `prisma/seed.ts`. Change/remove them before production use.

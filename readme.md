# CommunoLearn

A modern productivity management platform built with the T3 Stack. Seamlessly manage tasks, projects, and team collaboration with a sleek, modern interface.

## Features

- 🚀 Real-time collaboration
- 📊 Task and project management
- 👥 Team workspaces
- 📱 Responsive design
- 🔐 Secure authentication
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **API**: tRPC for type-safe APIs
- **Utilities**: Google Cloud
- **Deployment**: Vercel

## Getting Started

1. Clone and install:
```bash
git clone https://github.com/yourusername/communolearn.git
cd communolearn
npm install
```

2. Set up environment:
```bash
cp .env.example .env
# Configure DATABASE_URL, NEXTAUTH_SECRET, and other env variables
```

3. Initialize database:
```bash
npx prisma db push
npx prisma generate
```

4. Start development:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Development Commands

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting
- `npm run format` - Code formatting
- `npm run prisma:studio` - Database management

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.


# CyberNews AI - Enterprise Production Deployment & DevOps Guide

> **Release**: Version 4.0 Production Enterprise  
> **Deployment Target**: Cloud Run / Vercel + Supabase Managed PostgreSQL + Cloudflare CDN  
> **CI/CD Orchestration**: GitHub Actions  

---

## 1. Executive Summary & Infrastructure Architecture

The **CyberNews AI** platform is architected for zero-downtime deployments, high availability, and horizontal auto-scaling. The system runs as a containerized Node.js Express + Vite full-stack application backed by Supabase PostgreSQL with declarative range partitioning and Row Level Security (RLS).

---

## 2. Environment Configuration & Secrets Management

All production environment variables are stored in the secure secret manager (Supabase Vault / Cloud Run Secrets) and documented in `.env.example`:

```env
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
GEMINI_API_KEY=your-gemini-api-key
JWT_SECRET=your-secure-jwt-secret
```

---

## 3. Automated CI/CD Pipeline (GitHub Actions)

The `.github/workflows/deploy.yml` pipeline executes the following checks on every pull request and merge to `main`:
1. **Linting & Type Check**: Runs `npm run lint` and `tsc --noEmit`.
2. **Build Verification**: Runs `npm run build` with esbuild bundling and Vite compilation.
3. **Database Migration Check**: Validates Supabase PostgreSQL schema and RLS policies.
4. **Automated Container Build**: Builds OCI-compliant Docker container and deploys to Cloud Run with zero downtime.

---

## 4. Disaster Recovery & Backup Strategy

1. **Point-in-Time Recovery (PITR)**: Automated hourly snapshot backups with 30-day retention.
2. **Disaster Recovery Objectives**:
   * **Recovery Point Objective (RPO)**: < 5 minutes.
   * **Recovery Time Objective (RTO)**: < 15 minutes.
3. **Rollback Strategy**: Instant container rollback via Cloud Run revision history or Git tag revert.

---

## 5. Final Production Readiness Sign-Off

The platform is fully deployable, secure, high-performing, and ready to serve millions of users.

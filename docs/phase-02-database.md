# Phase 02: Database Schema
Status: ⬜ Pending
Dependencies: Phase 01

## Objective
Design and implement the database schema for PO, SO, and Delivery Logs.

## Requirements
### Functional
- [ ] Define Tables: Users, POs, SOs, Products, DeliveryLogs
- [ ] Implement Smart PO Suggestion Logic (Query)

### Non-Functional
- [ ] Data integrity (Foreign Keys)
- [ ] Indexing for performance

## Implementation Steps
1. [ ] Choose DB (PostgreSQL via Supabase/Neon OR SQLite locally)
2. [ ] Define Schema (Prisma Schema or Drizzle)
3. [ ] Create Migration Scripts

## Files to Create/Modify
- `prisma/schema.prisma` (if using Prisma)
- `src/lib/db.ts` - DB Connection

## Test Criteria
- [ ] Database connects successfully
- [ ] Tables created with correct relationships

---
Next Phase: [Phase 03: Backend API](./phase-03-backend.md)

# Phase 03: Backend API
Status: ⬜ Pending
Dependencies: Phase 02

## Objective
Create API endpoints for managing POs, SOs, and EOs (Delivery).

## Requirements
### Functional
- [ ] CRUD APIs for PO and SO
- [ ] EO Creation API (with Transaction support)
- [ ] Smart Suggestion API Endpoint

## Implementation Steps
1. [ ] `POST /api/po` - Create PO
2. [ ] `POST /api/so` - Create SO
3. [ ] `GET /api/po/suggest?productId=...` - Suggest Logic
4. [ ] `POST /api/eo` - Create Delivery Note

## Files to Create/Modify
- `src/app/api/route.ts` - API Handlers

## Test Criteria
- [ ] Can create PO/SO via Postman/Curl
- [ ] Suggest API returns correct older POs

---
Next Phase: [Phase 04: Frontend UI](./phase-04-frontend.md)

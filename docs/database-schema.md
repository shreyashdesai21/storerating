# Store Rating Platform — Database Schema Documentation

This document provides complete documentation for the PostgreSQL database schema, data integrity rules, indexing strategies, rating aggregation mechanisms, and migration/seed workflows for the Store Rating Platform.

---

## 1. Relational Entity Diagram

```text
               +-------------------+
               |       USER        |
               +-------------------+
               | id (PK)           |
               | name              |
               | email (UK)        |
               | password          |
               | address           |
               | role (ENUM)       |
               | createdAt         |
               | updatedAt         |
               +-------------------+
                 |               |
        1        |               | 1
      owns       |               | submits
        |        |               |
        v        |               v
+-------------------+     +-------------------+
|       STORE       |     |      RATING       |
+-------------------+     +-------------------+
| id (PK)           |     | id (PK)           |
| name              |     | userId (FK)       |
| email             |  1  | storeId (FK)      |
| address           |----<| rating (1..5)     |
| ownerId (FK)      |  has| createdAt         |
| createdAt         |     | updatedAt         |
| updatedAt         |     +-------------------+
+-------------------+
```

---

## 2. Models & Fields

### 2.1 `users` Table (`User` Model)

Stores user credentials, profile information, and role assignments for Role-Based Access Control (RBAC).

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY`, Default: `UUID` | Unique user identifier |
| `name` | `TEXT` | `NOT NULL` | Full name of the user |
| `email` | `TEXT` | `NOT NULL`, `UNIQUE` | Unique login email address |
| `password` | `TEXT` | `NOT NULL` | Bcrypt password hash |
| `address` | `TEXT` | `NOT NULL` | Physical address |
| `role` | `ENUM` | `Role` (`ADMIN`, `USER`, `STORE_OWNER`), Default: `USER` | Role-based access control level |
| `createdAt` | `TIMESTAMP` | `NOT NULL`, Default: `NOW()` | Timestamp when user record was created |
| `updatedAt` | `TIMESTAMP` | `NOT NULL`, Updated on edit | Timestamp when user record was last modified |

### 2.2 `stores` Table (`Store` Model)

Stores information about registered stores and links each store to its owner (`STORE_OWNER`).

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY`, Default: `UUID` | Unique store identifier |
| `name` | `TEXT` | `NOT NULL` | Name of the store |
| `email` | `TEXT` | `NOT NULL` | Store contact email |
| `address` | `TEXT` | `NOT NULL` | Physical store location |
| `ownerId` | `TEXT` | `NOT NULL`, `FOREIGN KEY` $\rightarrow$ `users(id)` | Owner user ID (`onDelete: Restrict`) |
| `createdAt` | `TIMESTAMP` | `NOT NULL`, Default: `NOW()` | Creation timestamp |
| `updatedAt` | `TIMESTAMP` | `NOT NULL`, Updated on edit | Last modification timestamp |

### 2.3 `ratings` Table (`Rating` Model)

Stores individual store ratings submitted by normal users (`USER`).

| Field | Type | Attributes / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `TEXT` | `PRIMARY KEY`, Default: `UUID` | Unique rating record identifier |
| `userId` | `TEXT` | `NOT NULL`, `FOREIGN KEY` $\rightarrow$ `users(id)` | Rating submitter ID (`onDelete: Cascade`) |
| `storeId` | `TEXT` | `NOT NULL`, `FOREIGN KEY` $\rightarrow$ `stores(id)` | Rated store ID (`onDelete: Cascade`) |
| `rating` | `INTEGER` | `NOT NULL`, `CHECK (rating >= 1 AND rating <= 5)` | Rating score from 1 to 5 |
| `createdAt` | `TIMESTAMP` | `NOT NULL`, Default: `NOW()` | Submission timestamp |
| `updatedAt` | `TIMESTAMP` | `NOT NULL`, Updated on edit | Last modification timestamp |

---

## 3. Relationships & Referential Integrity

1. **User $\rightarrow$ Store (`owns` / `StoreOwner`):**
   - One `User` with role `STORE_OWNER` can own multiple `Store`s (`1 : N`).
   - Foreign Key: `stores.ownerId` references `users.id`.
   - Referential Action: `onDelete: Restrict` prevents accidental user deletion if they own active stores.

2. **User $\rightarrow$ Rating (`submits`):**
   - One `User` can submit ratings across multiple stores (`1 : N`).
   - Foreign Key: `ratings.userId` references `users.id`.
   - Referential Action: `onDelete: Cascade` cleans up user ratings if the user account is deleted.

3. **Store $\rightarrow$ Rating (`receives`):**
   - One `Store` receives ratings from multiple users (`1 : N`).
   - Foreign Key: `ratings.storeId` references `stores.id`.
   - Referential Action: `onDelete: Cascade` cleans up store ratings if the store is deleted.

---

## 4. Constraints & Indexes

### 4.1 Constraints

- **Email Uniqueness:** `User.email` has a `UNIQUE` constraint preventing duplicate user registrations.
- **Rating User-Store Uniqueness:** Composite `UNIQUE (userId, storeId)` constraint on `ratings`. Guarantees that a user cannot submit multiple independent rating records for the same store.
- **Rating Score Range:** Database check constraint `CHECK (rating >= 1 AND rating <= 5)` ensures only valid 1–5 ratings are stored.

### 4.2 Indexes

Indexes are configured to support high-performance filtering, sorting, pagination, and lookup operations:

| Table | Index | Columns | Target Operations |
| :--- | :--- | :--- | :--- |
| `users` | `users_email_idx` | `email` | User authentication lookup |
| `users` | `users_role_idx` | `role` | Admin filtering by role (`ADMIN`, `USER`, `STORE_OWNER`) |
| `users` | `users_name_idx` | `name` | Admin search by user name |
| `stores` | `stores_name_idx` | `name` | Store search and alphabetical sorting |
| `stores` | `stores_email_idx` | `email` | Store search by contact email |
| `stores` | `stores_address_idx` | `address` | Store search and filtering by location |
| `stores` | `stores_ownerId_idx` | `ownerId` | Store owner dashboard query filtering |
| `ratings` | `ratings_userId_idx` | `userId` | Querying user's rating history |
| `ratings` | `ratings_storeId_idx` | `storeId` | Calculating store average rating & listing reviews |
| `ratings` | `ratings_userId_storeId_key` | `(userId, storeId)` | Unique rating lookup and enforcement |

---

## 5. Rating Aggregation Logic

Average rating is **not** stored as a static or manually editable column on the `Store` table to prevent stale or inconsistent data.

Instead, backend services compute dynamic statistics using PostgreSQL native aggregate functions via Prisma:

```javascript
// Calculate average rating and total rating count for a specific store
const storeStats = await prisma.rating.aggregate({
  _avg: {
    rating: true,
  },
  _count: {
    rating: true,
  },
  where: {
    storeId: targetStoreId,
  },
});

console.log(`Average Rating: ${storeStats._avg.rating ?? 0}`);
console.log(`Total Ratings: ${storeStats._count.rating}`);
```

For querying stores sorted by average rating, a grouped database query or SQL view/raw query can be used:

```javascript
const storeAverages = await prisma.rating.groupBy({
  by: ['storeId'],
  _avg: {
    rating: true,
  },
  _count: {
    rating: true,
  },
  orderBy: {
    _avg: {
      rating: 'desc',
    },
  },
});
```

---

## 6. Migration and Seeding Guide

### 6.1 Requirements
- Node.js (v18+)
- PostgreSQL running locally or remotely
- Environment variable `DATABASE_URL` set in `backend/.env`

### 6.2 Execution Workflow

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Apply database migrations
npx prisma migrate dev --name init

# 3. Generate Prisma client
npx prisma generate

# 4. Run database seed
npx prisma db seed
```

### 6.3 Seed Data Summary

The seed script (`backend/prisma/seed.js`) initializes the database with:
- **1 System Administrator:** `admin@storerating.com`
- **2 Store Owners:** `owner1@storerating.com`, `owner2@storerating.com`
- **3 Normal Users:** `alice@example.com`, `bob@example.com`, `charlie@example.com`
- **3 Stores:** "Tech Haven", "Fresh Organic Market", "Urban Coffee Roasters" (assigned to Store Owners)
- **8 Valid Ratings:** Distributed across users and stores, strictly obeying the `(userId, storeId)` uniqueness rule and 1–5 range.
- All user passwords are securely hashed using `bcryptjs` with salt round 10 (Password: `Password123!`).

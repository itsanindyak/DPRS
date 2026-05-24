# DRPS Server

A Node.js/Express TypeScript backend API for a **Disaster Preparedness and Response Platform** - managing emergency response training, exercises, and certification tracking for disaster response personnel.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Environment Setup](#3-environment-setup)
  - [4. Database Setup](#4-database-setup)
  - [5. Start Development Server](#5-start-development-server)
- [Architecture](#architecture)
  - [Directory Structure](#directory-structure)
  - [Request Lifecycle](#request-lifecycle)
  - [Key Components](#key-components)
  - [Database Schema](#database-schema)
- [API Reference](#api-reference)
  - [Authentication Routes](#authentication-routes)
  - [Admin Routes](#admin-routes)
  - [Training Routes](#training-routes)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
  - [Docker](#docker)
  - [Manual/Production](#manualproduction)
- [Troubleshooting](#troubleshooting)

---

## Overview

DRPS (Disaster Preparedness and Response Platform) is a multi-tenant training management system for emergency response organizations. It enables:

- **Hierarchical Organization Management**: Superadmin → Regional Admin → School Admin → Trainees
- **Training Exercise Management**: Create disaster scenarios with multiple training levels
- **Performance Tracking**: Record trainee sessions with scores and duration metrics
- **Certification System**: Automatic badge granting for high-performing trainees
- **Event-Driven Processing**: Asynchronous badge evaluation via message queues

The platform is built around the concept that disaster response skills are developed through structured training exercises ("games"), where trainees progress through levels and earn certifications (badges) for demonstrated proficiency.

## Key Features

- **Multi-Tenant Hierarchy**: Region → School → Trainees structure with role-based access
- **Training Management**: Create disaster scenarios and training levels with associated certifications
- **Performance Recording**: Track trainee session scores, duration, and metadata
- **Automated Certification**: Badge granting for trainees achieving score ≥ 90
- **Async Processing**: RabbitMQ-based event queue for certification evaluation
- **Caching**: Valkey (Redis-compatible) for session and organizational data
- **Input Validation**: Zod schema validation on all endpoints
- **JWT Authentication**: Secure token-based auth with refresh token rotation

---

## Tech Stack

- **Language**: TypeScript 5.9+
- **Runtime**: Node.js 18+
- **Framework**: Express.js 5.1+
- **Database**: PostgreSQL 15+ with Prisma ORM 6.16+
- **Message Queue**: RabbitMQ (via amqplib)
- **Cache**: Valkey/Redis (via ioredis)
- **Validation**: Zod 4.1+
- **Authentication**: JWT (jsonwebtoken) with bcrypt password hashing
- **Containerization**: Docker with multi-stage builds

---

## Prerequisites

- **Node.js**: 18 or higher
- **PostgreSQL**: 15 or higher
- **RabbitMQ**: Latest stable
- **Valkey/Redis**: Latest stable
- **Docker**: 20.10+ (for containerized deployment)
- **npm**: 9+

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd DRPS/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the server root directory:

```bash
# Server Configuration
PORT=8000
NODE_ENV=development

# Database (PostgreSQL)
DATABASE_URL=postgresql://postgres:password@localhost:5432/drps

# JWT Configuration
JWT_SECRET=your-secret-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# RabbitMQ (for async event processing)
RABBIT_MQ_URL=amqp://guest:guest@localhost:5672

# Valkey/Redis (for caching)
VALKEY_URL=redis://localhost:6379
```

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `NODE_ENV` | Environment | `development`, `production`, `test` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | `your-secret-key-here` |
| `JWT_EXPIRES_IN` | JWT expiration | `7d` (7 days), `15m` (15 minutes) |
| `CORS_ORIGIN` | Allowed CORS origin | `*` or `http://localhost:3000` |
| `RABBIT_MQ_URL` | RabbitMQ connection URL | `amqp://guest:guest@localhost:5672` |
| `VALKEY_URL` | Valkey/Redis connection URL | `redis://localhost:6379` |

### 4. Database Setup

#### Start PostgreSQL, RabbitMQ, and Valkey with Docker (recommended)

```bash
# Start all infrastructure services
docker run --name drps-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:16
docker run --name drps-rabbitmq -p 5672:5672 -p 15672:15672 -d rabbitmq:3-management
docker run --name drps-valkey -p 6379:6379 -d valkey/valkey
```

#### Generate Prisma Client

```bash
npx prisma generate
```

#### Run Migrations

```bash
npx prisma migrate dev --name init
```

#### Seed the Database (creates superadmin)

```bash
npm run db:seed
# or
npx prisma db seed
```

This creates a default superadmin account:
- **Email**: `bitwise@sih.com`
- **Password**: `bitwise`

> ⚠️ **Change this password in production!**

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:8000` (or the port specified in `.env`).

**Health Check:**
```bash
curl http://localhost:8000/health
# Response: {"status":"ok"}
```

---

## Architecture

### Directory Structure

```
server/
├── prisma/
│   ├── schema.prisma          # Database schema definition
│   ├── seed.ts                # Database seeding script
│   └── migrations/            # Prisma migrations
├── src/
│   ├── app.ts                 # Express app setup & middleware
│   ├── server.ts              # Server entry point
│   ├── config/
│   │   └── env.ts              # Environment variable validation & config
│   ├── controller/
│   │   ├── auth.controller.ts  # Authentication controller
│   │   ├── training.controller.ts # Training exercise controller
│   │   └── subscriber.controller.ts # RabbitMQ subscriber registration
│   ├── middleware/
│   │   ├── auth.ts             # JWT authentication middleware
│   │   ├── role.ts             # Role-based access control middleware
│   │   ├── validRequest.ts     # Zod request validation middleware
│   │   └── errorHandler.ts     # Global error handling middleware
│   ├── routes/
│   │   ├── auth.routes.ts      # Authentication routes
│   │   ├── admin.routes.ts      # Admin management routes
│   │   └── training.routes.ts   # Training exercise routes
│   ├── services/
│   │   ├── auth.service.ts     # Authentication business logic
│   │   ├── admin.service.ts     # Admin creation & management
│   │   ├── training.service.ts  # Training & level management
│   │   ├── badge.service.ts     # Badge checking & granting
│   │   ├── rabbitmq.service.ts  # RabbitMQ connection & messaging
│   │   ├── redis.service.ts     # Valkey/Redis client wrapper
│   │   └── redisKey.service.ts  # Redis key helpers (school caching)
│   ├── types/
│   │   ├── auth.api.ts         # Zod schemas for auth requests
│   │   ├── training.api.ts      # Zod schemas for training requests
│   │   └── express.d.ts        # Express type extensions
│   └── utils/
│       ├── ApiResponce.ts      # Standardized API response class
│       ├── AppError.ts         # Custom error class with status codes
│       └── asyncHandler.ts     # Async route handler wrapper
├── dockerfile                  # Multi-stage Docker build
├── docker-compose.yaml         # Docker Compose for containerized dev
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

### Request Lifecycle

```
1. HTTP Request arrives at Express router
2. CORS middleware processes the request
3. Cookie parser extracts refresh token from cookies
4. Route-specific middleware chain:
   a. validateRequest() - Zod schema validation
   b. authMiddleware - JWT verification & user attachment
   c. requireRole() - Role-based access check
5. Controller action executes (calls service layer)
6. Service layer performs business logic & DB operations
7. For training submissions: publishes event to RabbitMQ for async badge processing
8. Response constructed via ApiResponce class
9. Error handler catches any errors & formats error response
```

### Key Components

#### Organization Hierarchy

The platform supports a multi-tenant structure:

```
SUPERADMIN (Platform Administrator)
  └── REGIONALADMIN (Regional Coordinator)
        └── SCHOOLADMIN (School/Organization Administrator)
              └── STUDENT (Trainee)
```

Each admin scope is controlled via `AdminMeta`:
- `REGIONALADMIN`: Can only manage schools within their assigned region
- `SCHOOLADMIN`: Can only manage trainees within their assigned school

#### Authentication System (`src/services/auth.service.ts`)

The `AuthService` manages all authentication operations:

- **Trainee Registration**: Registers new trainee, creates Account + Student record with school/region association
- **Login**: Validates credentials, generates access (15m) + refresh (7d) tokens, stores refresh token in DB
- **Token Verification**: Validates JWT and checks account still exists
- **Refresh Token Handler**: Rotates access tokens using valid refresh token
- **OwnMe**: Returns enriched user data based on role

**Token Cookie Lifecycle:**
- `refreshToken` cookie: HttpOnly, Secure in production, 7-day expiry
- `accessToken` cookie: HttpOnly, Secure in production, 15-minute expiry

#### Role-Based Access Control

Roles defined in `prisma/schema.prisma`:
```prisma
enum Role {
  STUDENT
  SCHOOLADMIN
  REGIONALADMIN
  SUPERADMIN
}
```

**Role Permissions:**

| Endpoint | STUDENT | SCHOOLADMIN | REGIONALADMIN | SUPERADMIN |
|----------|---------|-------------|---------------|------------|
| `POST /api/auth/studentSignup` | ✅ | ❌ | ❌ | ❌ |
| `POST /api/auth/login` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/auth/me` | ✅ | ✅ | ✅ | ✅ |
| `GET /api/auth/logout` | ✅ | ✅ | ✅ | ✅ |
| `POST /api/admin/addRegionalAdmin` | ❌ | ❌ | ❌ | ✅ |
| `POST /api/admin/addSchoolAdmin` | ❌ | ❌ | ✅ | ❌ |
| `POST /api/training/createExercise` | ❌ | ❌ | ❌ | ✅ |
| `POST /api/training/:exerciseId/createLevel` | ❌ | ❌ | ❌ | ✅ |
| `POST /api/training/submit/:exerciseID/:levelName` | ✅ | ❌ | ❌ | ❌ |
| `GET /api/training/all` | ✅ | ✅ | ✅ | ✅ |

#### Training Management (`src/services/training.service.ts`)

Training exercises follow this hierarchy:
```
Exercise (Disaster Scenario)
  └── Level (Training Level)
        └── Badge (Certification)
```

- **createExercise**: Creates or upserts a training exercise by title
- **createLevelAndBadges**: Creates up to 3 levels per exercise, each with an associated certification badge
- **getExercise**: Fetches exercise with levels and badge count
- **getAllExercises**: Lists all exercises with levels and badges, ordered by creation date
- **exercisesDropdown**: Minimal exercise list (id + title only) for dropdowns
- **submitSession**: Records trainee session, publishes event for async badge evaluation

#### Certification System (`src/services/badge.service.ts`)

Automated badge/certification granting via RabbitMQ event processing:

1. Trainee submits training session
2. `trainingService.submitSession()` publishes `training.session.created` event
3. Subscriber consumer (`subscriber.controller.ts`) processes the event
4. `badgeService.checkAndGrantBadges()` evaluates:
   - Score ≥ 90 (certification threshold)
   - Badge not already earned (prevents duplicates)
5. Certification badge granted via `StudentBadge` creation

#### Message Queue (`src/services/rabbitmq.service.ts`)

RabbitMQ provides async event processing for certification evaluation:

- **Connection Management**: Auto-reconnect with exponential backoff
- **Channel Pooling**: Channels cached by queue name
- **Publish**: Durable queue messages for `training.session.created`
- **Subscribe**: Async message consumption with acknowledgment

#### Caching Layer (`src/services/redis.service.ts`)

Valkey/Redis client for session data caching:

- Auto-reconnect (5 attempts, exponential backoff up to 10s)
- JSON serialization for complex data
- Connection lazy-loading on first operation

---

### Database Schema

![Database Schema Preview](./Untitled.png)

---

## API Reference

### Authentication Routes

Base path: `/api/auth`

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| `POST` | `/studentSignup` | No | - | Register new trainee |
| `POST` | `/login` | No | - | User login |
| `GET` | `/me` | Yes | Any | Get current user info |
| `GET` | `/logout` | Yes | Any | Logout & clear cookies |
| `POST` | `/refresh-accesss-token` | No | - | Refresh access token |

#### POST /studentSignup

**Request:**
```json
{
  "email": "trainee@example.com",
  "password": "Password123",
  "schoolName": "Central Emergency Center"
}
```

**Password Requirements:**
- At least 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "accountId": 1,
    "studentId": 1,
    "accessToken": "<jwt-token>"
  }
}
```

Sets `refreshToken` cookie (7-day expiry).

#### POST /login

**Request:**
```json
{
  "email": "trainee@example.com",
  "password": "Password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "accessToken": "<jwt-token>",
    "accountId": 1,
    "email": "trainee@example.com",
    "role": "STUDENT",
    "roleDetails": {
      "studentId": 1,
      "schoolId": 1,
      "regionId": 1
    }
  }
}
```

Sets `refreshToken` and `accessToken` cookies (both 7-day expiry).

#### GET /me

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200) - Trainee:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "accountId": 1,
    "email": "trainee@example.com",
    "role": "STUDENT",
    "student": {
      "id": 1,
      "accountId": 1,
      "schoolId": 1,
      "regionId": 1
    }
  }
}
```

**Response (200) - Regional Admin:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "accountId": 2,
    "email": "regional@example.com",
    "role": "REGIONALADMIN",
    "adminMeta": {
      "id": 1,
      "regionId": 1
    }
  }
}
```

#### POST /refresh-accesss-token

**Request:** Cookie must contain valid `refreshToken`.

**Response (200):**
```json
{
  "success": true,
  "message": "New access token issued",
  "data": {
    "accessToken": "<new-jwt-token>"
  }
}
```

---

### Admin Routes

Base path: `/api/admin`

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| `POST` | `/addRegionalAdmin` | Yes | SUPERADMIN | Create regional admin |
| `POST` | `/addSchoolAdmin` | Yes | REGIONALADMIN | Create school admin |

#### POST /addRegionalAdmin

Creates a regional admin with auto-generated password.

**Headers:** `Authorization: Bearer <accessToken>`

**Request:**
```json
{
  "email": "regional@example.com",
  "regionName": "North Region"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "email": "regional@example.com",
    "password": "Xk9#mP2$L"
  }
}
```

> ⚠️ Password is auto-generated. Share securely with the admin.

#### POST /addSchoolAdmin

Creates a school admin with auto-generated password. Region is derived from the creator's (REGIONALADMIN) region.

**Headers:** `Authorization: Bearer <accessToken>`

**Request:**
```json
{
  "email": "school@example.com",
  "schoolName": "Central Emergency Center"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "accountId": "school@example.com",
    "password": "Qk8$pL3#M"
  }
}
```

---

### Training Routes

Base path: `/api/training`

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| `POST` | `/createExercise` | Yes | SUPERADMIN | Create new training exercise |
| `POST` | `/:exerciseId/createLevel` | Yes | SUPERADMIN | Add training levels to exercise |
| `POST` | `/submit/:exerciseID/:levelName` | Yes | STUDENT | Submit training session |
| `GET` | `/all` | Yes | Any | Get all exercises with levels |
| `GET` | `/drop` | Yes | Any | Get exercises for dropdown |
| `GET` | `/:exerciseId` | Yes | Any | Get single exercise details |

#### POST /createExercise

**Headers:** `Authorization: Bearer <accessToken>`

**Request:**
```json
{
  "exerciseName": "Earthquake Response Level 1"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Exercise inserted succesfully.",
  "data": {
    "id": 1,
    "title": "Earthquake Response Level 1",
    "createdAt": "2025-09-11T18:26:42.000Z",
    "updatedAt": "2025-09-11T18:26:42.000Z"
  }
}
```

#### POST /:exerciseId/createLevel

**Headers:** `Authorization: Bearer <accessToken>`

**Request:**
```json
{
  "levels": [
    {
      "levelName": "Basic Assessment",
      "badgeName": "Basic Assessment Certificate"
    },
    {
      "levelName": "Advanced Rescue",
      "badgeName": "Advanced Rescue Certificate"
    }
  ]
}
```

**Constraints:**
- Maximum 3 levels per request
- Level name must be 5-30 characters
- Badge name must be 5-30 characters

**Response (200):**
```json
{
  "success": true,
  "message": "Levels and badges created successfully.",
  "data": [
    {
      "id": 1,
      "name": "Basic Assessment",
      "exerciseId": 1,
      "badgeId": 1,
      "createdAt": "2025-09-11T18:30:00.000Z",
      "updatedAt": "2025-09-11T18:30:00.000Z",
      "badge": {
        "id": 1,
        "title": "Basic Assessment Certificate",
        "description": null,
        "iconUrl": null,
        "type": "LEVEL"
      }
    }
  ]
}
```

#### POST /submit/:exerciseID/:levelName

Records a trainee's training session. Automatically triggers certification evaluation if score ≥ 90.

**Headers:** `Authorization: Bearer <accessToken>`

**Request:**
```json
{
  "score": 95
}
```

**Constraints:**
- `exerciseID` must be a positive integer
- `levelName` must match an existing level name
- `score` must be 0-1,000,000

**Response (200):**
```json
{
  "success": true,
  "message": "Submitted",
  "data": {
    "id": 1,
    "studentId": 1,
    "schoolId": 1,
    "regionId": 1,
    "exerciseId": 1,
    "levelId": 1,
    "score": 95,
    "duration": 0,
    "playedAt": "2025-09-11T18:35:00.000Z"
  }
}
```

#### GET /all

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200):**
```json
{
  "success": true,
  "message": "Fetched all exercises successfully",
  "data": [
    {
      "id": 1,
      "title": "Earthquake Response Level 1",
      "createdAt": "2025-09-11T18:26:42.000Z",
      "updatedAt": "2025-09-11T18:26:42.000Z",
      "levels": [
        {
          "id": 1,
          "name": "Basic Assessment",
          "exerciseId": 1,
          "badgeId": 1,
          "badge": {
            "id": 1,
            "title": "Basic Assessment Certificate"
          }
        }
      ],
      "_count": {
        "levels": 2
      }
    }
  ]
}
```

#### GET /drop

**Headers:** `Authorization: Bearer <accessToken>`

**Response (200):**
```json
{
  "success": true,
  "message": "Fetched all exercises successfully",
  "data": [
    { "id": 1, "title": "Earthquake Response Level 1" },
    { "id": 2, "title": "Flood Rescue Training" }
  ]
}
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `8000` | Server port |
| `NODE_ENV` | No | `development` | Environment: `development`, `production`, `test` |
| `DATABASE_URL` | Yes | - | PostgreSQL connection string |
| `JWT_SECRET` | Yes | - | JWT signing secret (min 32 characters) |
| `JWT_EXPIRES_IN` | No | `7d` | JWT expiration (e.g., `7d`, `15m`) |
| `CORS_ORIGIN` | Yes | - | CORS allowed origin (`*` or URL) |
| `RABBIT_MQ_URL` | Yes | - | RabbitMQ connection URL |
| `VALKEY_URL` | Yes | - | Valkey/Redis connection URL |

### Validation

Environment variables are validated at startup via Zod schema (`src/config/env.ts`). If validation fails, the server will not start and will display which variables are invalid.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with ts-node (auto-reload on changes) |
| `npm run build` | Compile TypeScript to JavaScript in `/dist` |
| `npm start` | Start production server (requires build first) |
| `npm run db:seed` | Seed the database with superadmin account |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma migrate deploy` | Deploy migrations (production) |
| `npx prisma db push` | Push schema to database (development) |

---

## Deployment

### Docker

#### Build and Run

```bash
# Build the Docker image
docker build -t drps-server .

# Run with environment file
docker run -p 8000:8000 --env-file .env drps-server
```

#### Using Docker Compose

```bash
# Start all services (backend + infrastructure)
docker-compose up --build
```

The `docker-compose.yaml` starts the backend on port 7000. Update `.env` to match:

```bash
PORT=7000
DATABASE_URL=postgresql://postgres:password@postgres:5432/drps
RABBIT_MQ_URL=amqp://guest:guest@rabbitmq:5672
VALKEY_URL=redis://valkey:6379
```

#### Dockerfile Details

Multi-stage build:
1. **Builder stage**: TypeScript compilation
2. **Runner stage**: Production dependencies only

The runner stage:
- Exposes port 3000
- Runs `prisma migrate deploy` before starting the server
- Uses `node dist/server.js` as entry point

### Manual/Production

```bash
# 1. Install production dependencies only
npm install --omit=dev

# 2. Build TypeScript
npm run build

# 3. Generate Prisma client
npx prisma generate

# 4. Run migrations
DATABASE_URL="your-production-url" npx prisma migrate deploy

# 5. Start server
NODE_ENV=production npm start
```

---

## Troubleshooting

### Database Connection Issues

**Error:** `could not connect to server: Connection refused`

**Solutions:**
1. Verify PostgreSQL is running:
   ```bash
   docker ps  # if using Docker
   pg_isready  # if installed locally
   ```
2. Check `DATABASE_URL` format: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE`
3. Ensure database exists:
   ```bash
   npx prisma db push
   ```

### Invalid Environment Variables

**Error:** `❌ Invalid environment variables: {...}`

**Solution:**
Check that all required environment variables are set in `.env`. See [Environment Variables](#environment-variables) section for required variables.

### RabbitMQ Connection Issues

**Symptom:** Server starts but badge evaluations don't work

**Solutions:**
1. Verify RabbitMQ is running:
   ```bash
   docker logs <container-name>
   ```
2. Check `RABBIT_MQ_URL` format: `amqp://guest:guest@localhost:5672`
3. Check if management UI is accessible at `http://localhost:15672`

### Redis/Valkey Connection Issues

**Error:** `Redis failed to reconnect after 5 attempts`

**Solutions:**
1. Verify Valkey/Redis is running:
   ```bash
   docker ps
   ```
2. Check `VALKEY_URL` format: `redis://localhost:6379`
3. Check logs for connection errors

### Prisma Client Issues

**Error:** `Cannot find module '@prisma/client'`

**Solution:**
```bash
npx prisma generate
```

### Migration Failures

**Error:** `Migration rejected` or tables already exist

**Solution:**
For development, you can reset the database:
```bash
npx prisma migrate reset
```

For production, manually review migration SQL and apply carefully.

### Token Expiration Issues

**Symptom:** Getting logged out frequently during development

**Solution:**
Increase `JWT_EXPIRES_IN` in `.env` for development:
```
JWT_EXPIRES_IN=30d
```

### Superadmin Login Not Working

**Symptom:** Cannot login with default superadmin credentials

**Solution:**
Re-seed the database:
```bash
npm run db:seed
```

---

## License

ISC
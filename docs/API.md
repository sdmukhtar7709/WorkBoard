# WorkBoard API Design

## REST API Endpoints
The API should follow a predictable REST structure with versioned endpoints, consistent response payloads, and clear error handling.

Base path:
- `/api/v1`

## Authentication Endpoints
- `POST /auth/register` - create a new account.
- `POST /auth/login` - authenticate a user.
- `POST /auth/logout` - end the current session.
- `GET /auth/me` - return the current authenticated user.

## Job Endpoints
- `GET /jobs` - list jobs for the current user.
- `GET /jobs/:id` - get a single job.
- `POST /jobs` - create a job.
- `PATCH /jobs/:id` - update a job.
- `DELETE /jobs/:id` - remove a job.

## Category Endpoints
- `GET /categories` - list categories.
- `GET /categories/:id` - get a single category.
- `POST /categories` - create a category.
- `PATCH /categories/:id` - update a category.
- `DELETE /categories/:id` - remove a category.

## Response Format
Successful responses should be consistent and easy for the frontend to consume.

Example structure:
- `success`: boolean
- `message`: human-readable summary
- `data`: payload object or list

## Error Format
Errors should be returned in a consistent format so the frontend can display a clear message.

Example structure:
- `success`: false
- `message`: readable error description
- `error`: optional technical or validation detail
- `statusCode`: HTTP status code


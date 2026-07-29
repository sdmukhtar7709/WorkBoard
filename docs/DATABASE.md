# WorkBoard Database Design

## Initial Database Design
The first database model should support user accounts, jobs, and categories. The schema should stay simple at the beginning and expand only when new product requirements are confirmed.

## Users Table
Stores account and profile identity information.

Suggested fields:
- id
- username
- email
- password_hash
- full_name
- avatar_url
- created_at
- updated_at

## Jobs Table
Stores the main work items managed in WorkBoard.

Suggested fields:
- id
- user_id
- category_id
- title
- description
- status
- priority
- due_date
- created_at
- updated_at

## Categories Table
Stores grouping labels used to organize jobs.

Suggested fields:
- id
- user_id
- name
- color
- created_at
- updated_at

## Relationships
- One user can own many jobs.
- One user can own many categories.
- One category can be assigned to many jobs.
- Each job belongs to one user and may belong to one category.

## Future Tables
- sessions for authentication persistence.
- notifications for user alerts.
- comments for job collaboration.
- attachments for file uploads.
- activity_logs for audit history.
- ai_summaries for AI-generated insights.

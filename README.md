# EVRLY

## Running the project locally

### 1. Prerequisites
- Docker and Docker Compose installed
- Git installed

> You can also run backend and frontend with Node.js directly, but the easiest way to have everything (including n8n and Postgres) running is via Docker.

### 2. Start all services with Docker
From the project root:

```bash
docker compose up --build
```

This will start:
- Postgres (used by n8n)
- n8n (workflow engine)
- Backend (Node/Express API on port 3000)
- Frontend (Next.js app on port 8080)

After the containers are up, you can access:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- n8n: http://localhost:5678

### 3. Configure n8n

1. Open n8n in the browser:
   - http://localhost:5678

2. Create the database credential:
   - Go to the “Credentials” section in n8n
   - Create a new credential for your database (host, port, database, user, password, by default use: `n8n-postgres`, `5432`, `n8n`, `n8n`, `n8n`)
   - Save the credential so it can be used by the workflows

3. Import the workflows:
   - In the n8n UI, go to “Workflows” → “Import from file”
   - Import each of the JSON files located in the `n8n` folder of this repository:
     - `DELETE Users.json`
     - `GET Users.json`
     - `POST Users.json`

4. Enable the webhook endpoints:
   - After importing, open each workflow and set it to **Active**
   - Make sure the webhook trigger nodes are active so their endpoints are available

Once the workflows are active and the database credential is configured, the frontend and backend can interact with n8n’s webhooks and the project will be ready to use locally.

5. Access the Frontend:
   - Open your browser and go to:
     - http://localhost:8080

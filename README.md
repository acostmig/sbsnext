# SBSNext Website

Welcome to the **SBSNext** website repository! 🚀

## 📌 About

This repository contains the source code for the **SBSNext** website. It serves as the online presence for **SBSNext**, providing information about our services, projects, and company updates.

## 🔧 Tech Stack

- **Frontend**: [Next.js, Tailwindcss]
- **Backend**: [Next.js Hybrid model (app)]
- **Database**: PostgreSQL
- **Infrastructure CI**: Docker image is built and pushed to Github Container Registy (GHCR)
- **Infrastructure**: Virtual Machine pulls the site's image and runs the orchestration of containers via Docker Compose (Nginx, DB Migration and Website).

## 🛠 First-Time Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/acostmig/sbsnext.git
   cd sbsnext
   ```

2. **Install Dependencies**
   ```sh
   pnpm --prefix sbsnext-site install
   ```

3. **Start PostgreSQL Database**
   ```sh
   docker-compose up postgres-db
   ```
   This will create a directory for the database (`localdb`), which is gitignored.

4. **Create Environment Variables**
   - **In the root directory**, create a `.env` file with the following content:
     ```sh
     POSTGRES_URL="postgresql://postgres:password@localhost:5432/db-sbsnext"
     ```

   - **Inside `sbsnext-site`**, create a `.env.local` file:
     ```sh
     POSTGRES_URL="postgresql://postgres:password@localhost:5432/db-sbsnext"
     RESEND_API_KEY=<your-resend-api-key> # for contact-us email
     DISABLE_EMAIL="true" # disables sending emails
     OPENAI_API_KEY=<your-openai-api-key> # for chat
     ```

5. **Run Database Migrations**
   ```sh
   pnpm --prefix sbsnext-site db:migrate
   ```

## ▶️ Start Development

If the PostgreSQL database is not already running, start it:

```sh
docker-compose up postgres-db
```

Then, run the development server:

```sh
pnpm --prefix sbsnext-site dev
```



## 📬 Contact

For any inquiries, reach out via:

- 🌐 Website: SBSNext.com
- ✉️ Email: miguel@sbsnext.com

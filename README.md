# fullstack_web

## Backend configuration

Secrets (database credentials, API keys) are kept out of source control in `backend/.env.local`.

```bash
cd backend
cp .env.example .env.local   # then edit .env.local with your real values
mvn spring-boot:run
```

- `application.properties` imports `.env.local` via `spring.config.import`, resolved relative to the working directory, so run the app from `backend/`.
- Real OS environment variables override `.env.local`, so in production (e.g. AWS) set `DB_USERNAME`, `DB_PASSWORD`, etc. as environment variables or secrets and leave out the file.
- `DB_USERNAME` and `DB_PASSWORD` have no defaults, so the app fails at startup if they are missing.
- `.env.local` is git-ignored. Never commit it.

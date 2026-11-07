# Database connection

The API reads its PostgreSQL connection string from `DATABASE_URL`. For Supabase, download the database root certificate from **Project Settings > Database > SSL Configuration**, save it locally, and set `DATABASE_SSL_CA_CERT_PATH` in `.env` to its path. When this variable is set, the API uses `sslmode=verify-full` and the certificate to verify the database's TLS connection.

For example:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
DATABASE_SSL_CA_CERT_PATH=C:/certificates/prod-ca-2026.crt
```

Do not disable certificate verification to work around certificate errors.

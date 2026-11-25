# Database connection

The API reads its PostgreSQL connection string from `DATABASE_URL`. For Supabase, download the database root certificate from **Project Settings > Database > SSL Configuration**, save it locally, and set `DATABASE_SSL_CA_CERT_PATH` in `.env` to its path. When this variable is set, the API uses `sslmode=verify-full` and the certificate to verify the database's TLS connection.

For example:

```env
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
DATABASE_SSL_CA_CERT_PATH=C:/certificates/prod-ca-2026.crt
```

### Render

Render does not have access to a certificate stored on your computer. In the
Render service's **Environment** settings:

1. Add the downloaded Supabase root certificate under **Secret Files**, named
   `supabase-ca.crt`. Render makes it available at
   `/etc/secrets/supabase-ca.crt`.
2. Add an environment variable named `DATABASE_SSL_CA_CERT_PATH` with the value
   `/etc/secrets/supabase-ca.crt`.
3. Confirm `DATABASE_URL` is set to your Supabase connection string, then redeploy.

The application uses this certificate with `sslmode=verify-full`, which
validates both the certificate chain and the database hostname. Do not disable
certificate verification to work around certificate errors.

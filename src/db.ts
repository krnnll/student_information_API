import { existsSync } from 'node:fs';
import { Pool } from 'pg';
 
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing. Check your .env file.');
}

const caCertificatePath = process.env.DATABASE_SSL_CA_CERT_PATH;
const connectionUrl = new URL(databaseUrl);
if (caCertificatePath) {
  if (!existsSync(caCertificatePath)) {
    throw new Error(
      `DATABASE_SSL_CA_CERT_PATH does not point to an existing file: ${caCertificatePath}. On Render, add the certificate under Secret Files.`,
    );
  }

  connectionUrl.searchParams.set('sslmode', 'verify-full');
  connectionUrl.searchParams.set('sslrootcert', caCertificatePath);
}

export const pool = new Pool({ connectionString: connectionUrl.toString() });
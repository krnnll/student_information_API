import { Pool } from 'pg';
 
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is missing. Check your .env file.');
}

const caCertificatePath = process.env.DATABASE_SSL_CA_CERT_PATH;
const connectionUrl = new URL(databaseUrl);
if (caCertificatePath) {
  connectionUrl.searchParams.set('sslmode', 'verify-full');
  connectionUrl.searchParams.set('sslrootcert', caCertificatePath);
}

export const pool = new Pool({ connectionString: connectionUrl.toString() });
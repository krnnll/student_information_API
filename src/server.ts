import 'dotenv/config';
import { pool } from './db.js';
import express from 'express';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
const port = Number(process.env.PORT ?? 4000);

// 2.1.3 - middleware
//app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

app.use(express.json());
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Student Information API',
    course: 'ITE 303',
  });
});

// app.use((req, res, next) => {
//   console.log('A');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('B');
//   next();
// });

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

app.listen(port, () => {
  pool.query('SELECT NOW()')
    .then(() => console.log('Database connected successfully'))
    .catch((error: unknown) => {
      const errorCode =
        error instanceof Error && 'code' in error && typeof error.code === 'string'
          ? error.code
          : undefined;
      const code = errorCode ? ` (${errorCode})` : '';
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Database connection failed${code}: ${message}`);
      if (
        errorCode === 'SELF_SIGNED_CERT_IN_CHAIN' &&
        !process.env.DATABASE_SSL_CA_CERT_PATH
      ) {
        console.error(
          'Download the database root certificate from Supabase Database Settings and set DATABASE_SSL_CA_CERT_PATH in .env.',
        );
      }
    });

  console.log(`Server running at http://localhost:${port}`);
});

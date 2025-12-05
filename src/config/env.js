import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// env.js está em src/config/, então ../../.env leva à raiz do projeto
const envPath = path.resolve(__dirname, '../../.env');
console.log(`[dotenv] Loading .env from: ${envPath}`);

dotenv.config({ path: envPath });

console.log(`[dotenv] DB_HOST=${process.env.DB_HOST}, DB_USER=${process.env.DB_USER}, DB_PASSWORD="${process.env.DB_PASSWORD}"`);

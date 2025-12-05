import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 0. CARREGUE .ENV ANTES DE TUDO
import './config/env.js';

// 1. DEPOIS IMPORTE O SEQUELIZE (que agora vai ter .env carregado)
import sequelize from './config/database.js';
import './models/associations.js';

import profileRoutes from './routes/profileRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import authRoutes from './routes/authRoutes.js';
import attendanceFormRoutes from './routes/attendanceFormRoutes.js';
import publicTypeRoutes from './routes/publicTypeRoutes.js';
import attendanceTypeRoutes from './routes/attendanceTypeRoutes.js';
import attendanceTypeFieldRoutes from './routes/attendanceTypeFieldRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_PATH = path.join(__dirname, '../TRABALHO-FRONT-CORRIGIDO-main/projeto-atendimentos-frontend');

console.log(`[DEBUG] FRONTEND_PATH: ${FRONTEND_PATH}`);

// Middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  }
  next();
});

app.use(express.json());

// Servir arquivos estáticos do front-end
app.use(express.static(FRONTEND_PATH));

// API Routes
app.use('/api', profileRoutes); 
app.use('/api', userRoutes);    
app.use('/api/auth', authRoutes);
app.use('/api', attendanceFormRoutes);
app.use('/api', publicTypeRoutes);
app.use('/api', attendanceTypeRoutes);
app.use('/api', attendanceTypeFieldRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', reportRoutes);

// Health check endpoint
app.get('/api/status', (req, res) => {
    res.status(200).json({ message: 'API de Gerenciamento de Atendimentos Rodando!', status: 'online' });
});

// Catch-all route para servir index.html (SPA fallback)
app.get('/', (req, res) => {
    res.sendFile(path.join(FRONTEND_PATH, 'index.html'));
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(' Conexão com o banco de dados MySQL estabelecida com sucesso!');

        await sequelize.sync(); 
        console.log('Tabelas e Associações sincronizadas.');

        const HOST = process.env.HOST || '0.0.0.0';
        console.log(`[DEBUG] Iniciando listener em ${HOST}:${PORT}...`);
        
        const server = app.listen(PORT, HOST, () => {
          console.log(` Servidor rodando em http://${HOST}:${PORT}`);
        });

        server.on('error', (error) => {
            console.error('[ERROR] Erro no servidor:', error);
        });

        console.log('[DEBUG] Server object created, waiting for connections...');
    } catch (error) {
        console.error(' Erro ao iniciar o servidor ou conectar ao DB:', error);
        process.exit(1);
    }
};

// Trata erros não capturados globalmente
process.on('uncaughtException', (error) => {
    console.error('[UNCAUGHT EXCEPTION]', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('[UNHANDLED REJECTION]', reason, promise);
    process.exit(1);
});

startServer();

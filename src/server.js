// src/server.js

import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import './models/associations.js'; // Carrega os modelos e define as associações (Profile <-> User)

// --- IMPORTAÇÃO DE ROTAS ---
import profileRoutes from './routes/profileRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; // <-- NOVO
import authRoutes from './routes/authRoutes.js';
import attendanceFormRoutes from './routes/attendanceFormRoutes.js';
import publicTypeRoutes from './routes/publicTypeRoutes.js';
import attendanceTypeRoutes from './routes/attendanceTypeRoutes.js';
import attendanceTypeFieldRoutes from './routes/attendanceTypeFieldRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// --- 1. CONEXÃO DE ROTAS ---
// Todas as rotas começarão com /api
app.use('/api', profileRoutes); // Rotas de Perfis
app.use('/api', userRoutes);    // Rotas de Usuários
app.use('/api', authRoutes);
app.use('/api', attendanceFormRoutes);
app.use('/api', publicTypeRoutes);
app.use('/api', attendanceTypeRoutes);
app.use('/api', attendanceTypeFieldRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', reportRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API de Gerenciamento de Atendimentos Rodando!' });
});

// --- 2. FUNÇÃO DE INICIALIZAÇÃO ---
const startServer = async () => {
    try {
        // Testa a conexão com o banco de dados
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados MySQL estabelecida com sucesso!');

        // Sincroniza todos os modelos (cria as tabelas profiles e users)
        await sequelize.sync(); 
        console.log('Tabelas e Associações sincronizadas.');

        // Inicia o servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar o servidor ou conectar ao DB:', error);
        // Não encerra o processo se o erro for apenas uma falha de conexão temporária,
        // mas é bom para garantir que o erro de "Database não existe" seja visto.
    }
};

startServer();
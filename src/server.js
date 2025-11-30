import express from 'express';
import dotenv from 'dotenv';
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
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', profileRoutes); 
app.use('/api', userRoutes);    
app.use('/api', authRoutes);
app.use('/api', attendanceFormRoutes);
app.use('/api', publicTypeRoutes);
app.use('/api', attendanceTypeRoutes);
app.use('/api', attendanceTypeFieldRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', reportRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API de Gerenciamento de Atendimentos Rodando!' });
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(' Conexão com o banco de dados MySQL estabelecida com sucesso!');

        await sequelize.sync(); 
        console.log('Tabelas e Associações sincronizadas.');

        app.listen(PORT, () => {
            console.log(` Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(' Erro ao iniciar o servidor ou conectar ao DB:', error);
    }
};

startServer();
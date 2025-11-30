// src/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configuração da conexão com o banco de dados
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nome do Banco de Dados (Ex: management_db)
    process.env.DB_USER,      // Usuário (Ex: root)
    process.env.DB_PASSWORD,  // Senha (Ex: vazio ou sua senha)
    {
        host: process.env.DB_HOST, // Host (Ex: localhost)
        dialect: 'mysql',          // Dialeto do banco
        logging: false,            // Desabilita logs de consulta no console
        define: {
            // Garante o padrão snake_case para colunas automáticas
            underscored: true, 
            underscoredAll: true,
        },
    }
);

export default sequelize;
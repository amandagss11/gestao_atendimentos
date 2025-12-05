import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
    process.env.DB_NAME,      
    process.env.DB_USER,      
    process.env.DB_PASSWORD || null,  // Converte string vazia para null
    {
        host: process.env.DB_HOST, 
        dialect: 'mysql',         
        logging: false,            
        define: {
          
            underscored: true, 
            underscoredAll: true,
        },
    }
);

export default sequelize;
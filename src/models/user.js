// src/models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Profile from './profile.js'; // Importa o modelo Profile para criar a relação

const User = sequelize.define('User', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_user' 
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true, // E-mail único, essencial para login
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255), // Armazenaremos a senha em texto puro (inseguro)
        allowNull: false,
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    // --- CHAVE ESTRANGEIRA (FK) ---
    profile_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Profile, // Referencia a tabela 'profiles'
            key: 'id_profile',
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    // Nota: Os hooks de bcrypt foram omitidos conforme instrução do projeto anterior (devido à restrição de instalação).
});

export default User;
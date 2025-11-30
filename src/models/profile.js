// src/models/Profile.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Profile = sequelize.define('Profile', {
    id_profile: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_profile' // Nome da coluna no banco de dados
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    // Campo para definir permissões (ex: READ_ATTENDANCE, CRUD_USERS)
    permissions: { 
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'READ_ATTENDANCE' 
    }
}, {
    tableName: 'profiles', // Nome da tabela no banco de dados
    timestamps: true 
});

export default Profile;
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PublicType = sequelize.define('PublicType', {
    id_public: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_public'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'public_types',
    timestamps: true 
});

export default PublicType;
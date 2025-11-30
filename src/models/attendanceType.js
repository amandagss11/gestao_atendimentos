import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import PublicType from './publicType.js'; 
const AttendanceType = sequelize.define('AttendanceType', {
    id_attendance_type: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_attendance_type'
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    public_type_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PublicType, 
            key: 'id_public',
        }
    }
}, {
    tableName: 'attendance_types',
    timestamps: true 
});

export default AttendanceType;
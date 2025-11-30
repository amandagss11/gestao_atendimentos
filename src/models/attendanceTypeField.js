import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import AttendanceType from './attendanceType.js'; 

const AttendanceTypeField = sequelize.define('AttendanceTypeField', {
    id_field: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_field'
    },
    label: { 
        type: DataTypes.STRING(100),
        allowNull: false
    },
    field_name: { 
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: 'unique_field_per_type' 
    },
    field_type: { 
        type: DataTypes.ENUM('text', 'number', 'date', 'textarea', 'select'),
        allowNull: false
    },
    is_required: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    attendance_type_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AttendanceType, 
            key: 'id_attendance_type',
        },
        unique: 'unique_field_per_type' 
    }
}, {
    tableName: 'attendance_type_fields',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['field_name', 'attendance_type_id']
        }
    ]
});

export default AttendanceTypeField;
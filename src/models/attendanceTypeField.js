// src/models/AttendanceTypeField.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import AttendanceType from './attendanceType.js'; // Importa o modelo AttendanceType

const AttendanceTypeField = sequelize.define('AttendanceTypeField', {
    id_field: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_field'
    },
    label: { // O rótulo que aparecerá para o usuário (Ex: "Nome do Empregador")
        type: DataTypes.STRING(100),
        allowNull: false
    },
    field_name: { // O nome técnico da coluna/chave (Ex: 'employer_name')
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: 'unique_field_per_type' // Permite o mesmo field_name, mas não duas vezes no mesmo tipo
    },
    field_type: { // Tipo de dado (Ex: text, number, date, select)
        type: DataTypes.ENUM('text', 'number', 'date', 'textarea', 'select'),
        allowNull: false
    },
    is_required: { // Se o campo é obrigatório no cadastro
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    // --- CHAVE ESTRANGEIRA (FK) ---
    attendance_type_id: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AttendanceType, 
            key: 'id_attendance_type',
        },
        unique: 'unique_field_per_type' // Parte da chave composta única
    }
}, {
    tableName: 'attendance_type_fields',
    timestamps: true,
    // Define um índice composto para garantir que o mesmo field_name não se repita para o mesmo attendance_type
    indexes: [
        {
            unique: true,
            fields: ['field_name', 'attendance_type_id']
        }
    ]
});

export default AttendanceTypeField;
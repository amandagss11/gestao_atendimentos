// src/models/Attendance.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // Usuário que registrou o atendimento
import AttendanceForm from './attendanceForm.js'; // Forma do atendimento
import PublicType from './publicType.js'; // Público atendido
import AttendanceType from './attendanceType.js'; // Tipo de Atendimento

const Attendance = sequelize.define('Attendance', {
    id_attendance: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_attendance'
    },
    // --- CHAVES ESTRANGEIRAS (FKs) ---
    user_id: { // Usuário que fez o registro
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: 'id_user' }
    },
    attendance_form_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: AttendanceForm, key: 'id_form' }
    },
    public_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: PublicType, key: 'id_public' }
    },
    attendance_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: AttendanceType, key: 'id_attendance_type' }
    },
    
    // --- DADOS DO ATENDIMENTO ---
    // Campo para armazenar as respostas dos campos dinâmicos (Ex: CNPJ, Nome do Empregador)
    dynamic_data: {
        type: DataTypes.JSON, // Tipo JSON para flexibilidade no armazenamento
        allowNull: true
    },
    summary: { // Resumo do atendimento
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_resolved: { // Status do atendimento
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'attendances',
    timestamps: true 
});

export default Attendance;
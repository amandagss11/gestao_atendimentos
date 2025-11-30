// src/controllers/attendanceController.js
import Attendance from '../models/attendance.js';
import AttendanceTypeField from '../models/attendanceTypeField.js';
import User from '../models/user.js';
import AttendanceForm from '../models/attendanceForm.js';
import PublicType from '../models/publicType.js';
import AttendanceType from '../models/attendanceType.js';

// 1. CRIAR Atendimento (POST /api/attendances)
export const createAttendance = async (req, res) => {
    try {
        const { summary, user_id, attendance_type_id, ...rest } = req.body;
        
        // Validação de campos obrigatórios
        const requiredFields = ['user_id', 'attendance_form_id', 'public_type_id', 'attendance_type_id', 'summary'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ message: `O campo '${field}' é obrigatório.` });
            }
        }
        
        // --- VALIDAÇÃO DE CAMPOS DINÂMICOS OBRIGATÓRIOS ---
        const fieldsConfig = await AttendanceTypeField.findAll({
            where: { attendance_type_id: attendance_type_id, is_required: true },
            attributes: ['field_name', 'label']
        });

        const dynamicData = rest.dynamic_data || {};
        
        for (const field of fieldsConfig) {
            if (!dynamicData[field.field_name]) {
                // Se um campo obrigatório (is_required: true) não foi fornecido no dynamic_data
                return res.status(400).json({ 
                    message: `O campo dinâmico obrigatório '${field.label}' (${field.field_name}) não foi preenchido.` 
                });
            }
        }
        // --------------------------------------------------

        const newAttendance = await Attendance.create(req.body);

        return res.status(201).json(newAttendance);

    } catch (error) {
        console.error('Erro ao registrar atendimento:', error);
        // Em caso de FK inválida, o erro do Sequelize ajuda a diagnosticar
        return res.status(500).json({ message: 'Erro interno do servidor. Verifique se todas as chaves estrangeiras (IDs) existem.' });
    }
};

// 2. LISTAR Atendimentos (GET /api/attendances) - Incluindo todas as relações
export const listAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.findAll({
            // Inclui todas as associações para relatórios e exibição
            include: [
                { model: User, as: 'user', attributes: ['name', 'email'] },
                { model: AttendanceForm, as: 'attendanceForm', attributes: ['name'] },
                { model: PublicType, as: 'publicType', attributes: ['name'] },
                { model: AttendanceType, as: 'attendanceType', attributes: ['name'] },
            ],
            // Ordenar pelo mais recente
            order: [['createdAt', 'DESC']]
        });
        return res.status(200).json(attendances);
    } catch (error) {
        console.error('Erro ao listar atendimentos:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// (Implementar GET/:id, PUT, DELETE abaixo - segue o padrão)
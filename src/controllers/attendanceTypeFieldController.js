import AttendanceTypeField from '../models/attendanceTypeField.js';
import AttendanceType from '../models/attendanceType.js';

export const createAttendanceTypeField = async (req, res) => {
    try {
        const { label, field_name, field_type, is_required, attendance_type_id } = req.body;
        
        if (!label || !field_name || !field_type || !attendance_type_id) {
            return res.status(400).json({ message: 'Os campos label, field_name, field_type e attendance_type_id são obrigatórios.' });
        }
        
        const newField = await AttendanceTypeField.create(req.body);
        return res.status(201).json(newField);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Este nome de campo já existe para este tipo de atendimento.' });
        }
        console.error('Erro ao criar campo de tipo de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const listAttendanceTypeFields = async (req, res) => {
    try {
        const whereCondition = {};
        if (req.query.attendance_type_id) {
            whereCondition.attendance_type_id = req.query.attendance_type_id;
        }

        const fields = await AttendanceTypeField.findAll({
            where: whereCondition,
        });
        return res.status(200).json(fields);
    } catch (error) {
        console.error('Erro ao listar campos de tipo de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


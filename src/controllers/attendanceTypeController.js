// src/controllers/attendanceTypeController.js
import AttendanceType from '../models/attendanceType.js';
import PublicType from '../models/publicType.js';

// 1. CRIAR Tipo de Atendimento (POST /api/attendance-types)
export const createAttendanceType = async (req, res) => {
    try {
        const { name, description, public_type_id } = req.body;
        
        if (!name || !public_type_id) {
            return res.status(400).json({ message: 'Nome e ID do Público são obrigatórios.' });
        }
        
        const newAttendanceType = await AttendanceType.create({ name, description, public_type_id });
        return res.status(201).json(newAttendanceType);

    } catch (error) {
        console.error('Erro ao criar tipo de atendimento:', error);
        // Verifique se o erro é devido a uma FK inexistente (public_type_id)
        if (error.name === 'SequelizeForeignKeyConstraintError') {
             return res.status(400).json({ message: 'O ID do Público fornecido não existe.' });
        }
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// 2. LISTAR Tipos de Atendimento (GET /api/attendance-types)
export const listAttendanceTypes = async (req, res) => {
    try {
        const types = await AttendanceType.findAll({
            // Inclui o nome do público ao qual este tipo pertence
            include: [{ 
                model: PublicType,
                as: 'publicType',
                attributes: ['name']
            }]
        });
        return res.status(200).json(types);
    } catch (error) {
        console.error('Erro ao listar tipos de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// 3. OBTER Tipo por ID (GET /api/attendance-types/:id)
export const getAttendanceTypeById = async (req, res) => {
    try {
        const type = await AttendanceType.findByPk(req.params.id, {
            include: [{ 
                model: PublicType,
                as: 'publicType',
                attributes: ['name']
            }]
        });

        if (!type) {
            return res.status(404).json({ message: 'Tipo de atendimento não encontrado.' });
        }
        return res.status(200).json(type);
    } catch (error) {
        console.error('Erro ao buscar tipo de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// 4. ATUALIZAR Tipo (PUT /api/attendance-types/:id) - Omitindo para brevidade, segue o padrão
export const updateAttendanceType = async (req, res) => {
    try {
        const [updatedRows] = await AttendanceType.update(req.body, {
            where: { id_attendance_type: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Tipo de atendimento não encontrado ou nenhum dado para atualizar.' });
        }

        const updatedType = await AttendanceType.findByPk(req.params.id, {
            include: [{ model: PublicType, as: 'publicType', attributes: ['name'] }]
        });
        return res.status(200).json(updatedType);
    } catch (error) {
        console.error('Erro ao atualizar tipo de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


// 5. DELETAR Tipo (DELETE /api/attendance-types/:id) - Omitindo para brevidade, segue o padrão
export const deleteAttendanceType = async (req, res) => {
    try {
        const deletedRows = await AttendanceType.destroy({
            where: { id_attendance_type: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Tipo de atendimento não encontrado.' });
        }

        return res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar tipo de atendimento:', error);
        // Pode ser útil adicionar uma verificação se há atendimentos (Attendance) referenciando este tipo.
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

import AttendanceForm from '../models/attendanceForm.js';


export const createAttendanceForm = async (req, res) => {
    try {
        const { name } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'O nome da forma de atendimento é obrigatório.' });
        }
        
        const newForm = await AttendanceForm.create({ name });
        return res.status(201).json(newForm);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Forma de atendimento já cadastrada.' });
        }
        console.error('Erro ao criar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const listAttendanceForms = async (req, res) => {
    try {
        const forms = await AttendanceForm.findAll();
        return res.status(200).json(forms);
    } catch (error) {
        console.error('Erro ao listar formas de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const getAttendanceFormById = async (req, res) => {
    try {
        const form = await AttendanceForm.findByPk(req.params.id);

        if (!form) {
            return res.status(404).json({ message: 'Forma de atendimento não encontrada.' });
        }
        return res.status(200).json(form);
    } catch (error) {
        console.error('Erro ao buscar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const updateAttendanceForm = async (req, res) => {
    try {
        const [updatedRows] = await AttendanceForm.update(req.body, {
            where: { id_form: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Forma de atendimento não encontrada ou nenhum dado para atualizar.' });
        }

        const updatedForm = await AttendanceForm.findByPk(req.params.id);
        return res.status(200).json(updatedForm);
        
    } catch (error) {
        console.error('Erro ao atualizar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


export const deleteAttendanceForm = async (req, res) => {
    try {
        const deletedRows = await AttendanceForm.destroy({
            where: { id_form: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Forma de atendimento não encontrada.' });
        }

        return res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar forma de atendimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
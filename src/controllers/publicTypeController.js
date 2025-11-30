import PublicType from '../models/publicType.js';

export const createPublicType = async (req, res) => {
    try {
        const { name, description } = req.body;
        
        if (!name) {
            return res.status(400).json({ message: 'O nome do público é obrigatório.' });
        }
        
        const newPublicType = await PublicType.create({ name, description });
        return res.status(201).json(newPublicType);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'Público com este nome já cadastrado.' });
        }
        console.error('Erro ao criar público:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const listPublicTypes = async (req, res) => {
    try {
        const publicTypes = await PublicType.findAll();
        return res.status(200).json(publicTypes);
    } catch (error) {
        console.error('Erro ao listar públicos:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const getPublicTypeById = async (req, res) => {
    try {
        const publicType = await PublicType.findByPk(req.params.id);

        if (!publicType) {
            return res.status(404).json({ message: 'Público não encontrado.' });
        }
        return res.status(200).json(publicType);
    } catch (error) {
        console.error('Erro ao buscar público:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const updatePublicType = async (req, res) => {
    try {
        const [updatedRows] = await PublicType.update(req.body, {
            where: { id_public: req.params.id }
        });

        if (updatedRows === 0) {
            return res.status(404).json({ message: 'Público não encontrado ou nenhum dado para atualizar.' });
        }

        const updatedPublicType = await PublicType.findByPk(req.params.id);
        return res.status(200).json(updatedPublicType);
        
    } catch (error) {
        console.error('Erro ao atualizar público:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const deletePublicType = async (req, res) => {
    try {
        const deletedRows = await PublicType.destroy({
            where: { id_public: req.params.id }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: 'Público não encontrado.' });
        }

        return res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao deletar público:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
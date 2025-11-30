// src/controllers/userController.js
import User from '../models/user.js';
import Profile from '../models/profile.js';

// 1. CRIAR Usuário (POST /api/users)
export const createUser = async (req, res) => {
    try {
        const { name, email, password, profile_id } = req.body;
        
        if (!name || !email || !password || !profile_id) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }
        
        const newUser = await User.create({ name, email, password, profile_id });
        
        // Não retornar a senha na resposta
        const userResponse = newUser.toJSON();
        delete userResponse.password;

        return res.status(201).json(userResponse);

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: 'E-mail já cadastrado.' });
        }
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor. Verifique se o profile_id existe.' });
    }
};

// 2. LISTAR Usuários (GET /api/users)
export const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id_user', 'name', 'email', 'is_active', 'profile_id'], // Excluir a senha
            include: [{ 
                model: Profile, // Inclui o Perfil
                as: 'profile',
                attributes: ['name'] 
            }]
        });
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// (Implementar GET/:id, PUT, DELETE aqui, seguindo o padrão)

// Exemplo da função GET BY ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] }, 
            include: [{ model: Profile, as: 'profile', attributes: ['name'] }]
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
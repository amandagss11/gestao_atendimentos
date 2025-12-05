import User from '../models/user.js';
import Profile from '../models/profile.js';

export const createUser = async (req, res) => {
    try {
        // Suporta tanto o formato novo (name,email,password,profile_id)
        // quanto o formato legado do front-end (nome, login, perfil)
        let { name, email, password, profile_id } = req.body;
        const { nome, login, perfil } = req.body;

        // Mapear campos legados para o formato esperado
        if (!name && nome) name = nome;
        if (!email && login) email = login;

        // Se perfil (nome do perfil) for enviado, tente resolver o profile_id
        if (!profile_id && perfil) {
            const profileRecord = await Profile.findOne({ where: { name: perfil } });
            if (profileRecord) profile_id = profileRecord.id_profile || profileRecord.id || null;
        }

        // Se nenhum password for enviado, atribua uma senha padrão temporária
        if (!password) password = 'admin';

        if (!name || !email || !password || !profile_id) {
            return res.status(400).json({ message: 'Campos obrigatórios ausentes: name/email/password/profile_id.' });
        }

        const newUser = await User.create({ name, email, password, profile_id });
        
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

export const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id_user', 'name', 'email', 'is_active', 'profile_id'], // Excluir a senha
            include: [{ 
                model: Profile, 
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
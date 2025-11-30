// src/controllers/authController.js
import User from '../models/user.js';
import Profile from '../models/profile.js';

// Função de Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }

        // 1. Encontrar o usuário pelo e-mail
        const user = await User.findOne({
            where: { email },
            include: [{ 
                model: Profile,
                as: 'profile',
                attributes: ['name', 'permissions'] // Inclui o perfil para checagem de permissões
            }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Comparação da Senha (Método INSEGURO: texto puro)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Login bem-sucedido
        // Remove a senha antes de enviar a resposta
        const userResponse = user.toJSON();
        delete userResponse.password;

        return res.status(200).json({ 
            message: `Login bem-sucedido. Bem-vindo(a), ${userResponse.name}!`,
            user: userResponse,
            // Futuramente: retornar JWT
        });

    } catch (error) {
        console.error('Erro no processo de login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
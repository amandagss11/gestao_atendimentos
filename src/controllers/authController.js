import User from '../models/user.js';
import Profile from '../models/profile.js';

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }

        const user = await User.findOne({
            where: { email },
            include: [{ 
                model: Profile,
                as: 'profile',
                attributes: ['name', 'permissions'] 
            }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const userResponse = user.toJSON();
        delete userResponse.password;

        return res.status(200).json({ 
            message: `Login bem-sucedido. Bem-vindo(a), ${userResponse.name}!`,
            user: userResponse,
        });

    } catch (error) {
        console.error('Erro no processo de login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
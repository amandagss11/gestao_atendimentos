import User from '../models/user.js';
import Profile from '../models/profile.js';

export const login = async (req, res) => {
    try {
        // Aceita tanto 'email' quanto 'login' como identificador
        // Aceita tanto 'password' quanto 'senha'
        const email = req.body.email || req.body.login;
        const password = req.body.password || req.body.senha;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail/login e senha são obrigatórios.' });
        }

        const user = await User.findOne({
            where: { email },
            include: [{ 
                model: Profile,
                as: 'profile',
                attributes: ['id_profile', 'name', 'permissions'] 
            }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Compara senhas - se a senha no banco for texto plano, usa comparação direta
        // Se estiver criptografada (bcrypt), precisaria usar bcrypt.compare()
        const passwordMatch = user.password === password;

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const userResponse = user.toJSON();
        delete userResponse.password;

        // Retorna dados que o front-end espera
        return res.status(200).json({ 
            message: `Login bem-sucedido. Bem-vindo(a), ${userResponse.name}!`,
            id: userResponse.id_user,
            username: userResponse.name,
            email: userResponse.email,
            perfil: userResponse.profile?.name || 'Usuário',
            token: `jwt_token_${userResponse.id_user}_${Date.now()}`, // Token simulado
            user: userResponse,
        });

    } catch (error) {
        console.error('Erro no processo de login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};
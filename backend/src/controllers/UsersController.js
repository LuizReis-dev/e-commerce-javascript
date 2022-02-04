const knex = require('../../database/connection');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersController {
    async signup(req, res) {
        try {
            const { name, email, password, confirmPassword, isAdmin } = req.body;
            const authorization = req.headers.authorization;

            if (password !== confirmPassword) res.status(400).json({ message: 'Senhas não conferem!' });

            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(password, salt);
            let user = {};

            if (isAdmin === true) {
                if (!authorization) {
                    res.json({ message: 'Você precisa estar logado!' })
                } else {
                    jwt.verify(authorization, process.env.TOKEN_SECRET, async (error, decoded) => {
                        if (error) {
                            res.json({ auth: false, message: 'Token Inválido!' })
                        } else {
                            const userDb = await findUserById(decoded.id);
                            if (userDb[0].isAdmin === true) {
                                console.log('entrei aqui')
                                user = {
                                    name,
                                    email,
                                    password: encryptedPassword,
                                    isAdmin: true
                                }
                                const createdUser = await insertUser(user);
                                res.json({auth: true, user: createdUser, token: generateToken(createdUser.id)});
                            } else {
                                res.json({message: 'Vocês não tem as permissões'});
                            }
                        }
                    });
                }
                return
            }
            else {
                user = {
                    name,
                    email,
                    password: encryptedPassword,
                    isAdmin: false
                };

                const createdUser = await insertUser(user)
                return res.json({auth: true, user: createdUser, token: generateToken(createdUser.id)})
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado!', error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await knex('users')
                .select('*')
                .where({ email })
                .first()

            if (!user) return res.json({ auth: false, message: 'Usuário não encontrado' });

            if (bcrypt.compareSync(password, user.password)) {
                delete user.password;
                const token = generateToken(user.id);

                return res.json({ auth: true, user, token });

            } else {
                return res.json({ auth: false, message: 'Senha Inválida!' })
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado!', error: error.message });
        }
    }
}
const generateToken = (id) => {
    return jwt.sign({ id: id }, process.env.TOKEN_SECRET, { expiresIn: 300 });
}
async function findUserById(id) {
    try {
        const user = await knex('users')
            .select('*')
            .where({ id: id });

        return user;
    }
    catch (err) {
        return res.status(500).json({ message: 'Ocorreu um erro inesperado!', error: err.message });

    }
}

async function insertUser(user) {
    const [returnedUser] = await knex('users')
            .insert(user, '*');
            
            delete returnedUser.password;
            const token = generateToken(returnedUser.id);
            return returnedUser;

}
module.exports = UsersController;
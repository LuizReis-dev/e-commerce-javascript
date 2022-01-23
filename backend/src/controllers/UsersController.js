const knex = require('../../database/connection');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UsersController {
    async signup(req, res){
        try{
            const { name, email, password, confirmPassword } = req.body;
            
            if(password !== confirmPassword) return res.status(400).json({message: 'Senhas não conferem!'});

            const salt = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(password, salt);
            
            const user = { 
                name,
                email,
                password: encryptedPassword,
                isAdmin: false
            };

            const [returnedUser] = await knex('users')
                .insert(user, '*');
            
            delete returnedUser.password;

            const token = generateToken(returnedUser.id);
            return res.json({returnedUser, token});

        }
        catch (error) {
            return res.status(500).json({ message: 'Ocorreu um erro inesperado!', error: error.message });
        }
    }

    async login(req, res) {
        try{
            const { email, password} = req.body;
            
            const user = await knex('users')
                .select('*')
                .where({email})
                .first()

            if(!user) return res.json({ auth: false, message: 'Usuário não encontrado'});

            if(bcrypt.compareSync(password, user.password)){
                delete user.password;
                const token = generateToken(user.id);

                return res.json({auth: true, user , token});

            } else {
                return res.json({auth: false, message: 'Senha Inválida!'})
            }
        }
        catch(error){
            return res.status(500).json({ message: 'Ocorreu um erro inesperado!', error: error.message });
        }
    }

}
const generateToken = (id) => { 
    return jwt.sign({id: id}, process.env.TOKEN_SECRET, {expiresIn : 300});
}

module.exports = UsersController;
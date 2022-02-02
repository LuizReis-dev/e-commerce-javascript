const jwt = require('jsonwebtoken');
const knex = require('../../database/connection');

module.exports = (req, res, next) => {
    if(req.headers.token) { 
        jwt.verify(req.headers.token, process.env.TOKEN_SECRET, async (error, decoded)=>{
            if(error){
                return res.json({ auth: false, message: 'Token Inválido!' });
            } else {
                const adminDb = await knex('users')
                    .select('*')
                    .where({id: decoded.id})
                
                if(!adminDb[0].isAdmin) { 
                    return res.json({auth: false, message: ('Você não tem permissão')});
                } else {
                    return next();
                }
            }
        });
    } else {
        return res.status(400).json({ message: 'Token não informado!' });
    }
}
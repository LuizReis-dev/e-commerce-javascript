const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authToken = req.headers.authorization;

    if (authToken) {
        jwt.verify(authToken, process.env.TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res.json({ auth: false, message: 'Token Inválido!' })
            } else {
                req.userId = decoded.id
                return next();
            }
        });
    } else {
        return res.status(400).json({ message: 'Token não informado!' });

    }   
}
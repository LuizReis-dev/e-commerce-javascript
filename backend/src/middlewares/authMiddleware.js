const jwt = require('jsonwebtoken');

module.exports = nextFunction => {
    return (req, res, next) => {
        if (req.headers.token) {
            jwt.verify(req.headers.token, process.env.TOKEN_SECRET, (error, decoded) => {
                if (error) {
                    return res.json({ auth: false, message: 'Token Inválido!' })
                } else {
                    req.userId = decoded.id
                    nextFunction(req, res, next);
                }
            });
        } else {
            return res.status(400).json({auth:false, message: 'Token não informado!' });

        }
    }
}

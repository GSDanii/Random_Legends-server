const { verifyJwt } = require('../utils/jwt.utils')
const deleteBearer = require('../utils/string.util');

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) {
        const token = deleteBearer(authorization);
        console.log("QUE COJONES ES ESTO???", verifyJwt(token))
        const { sub, username, role, summonerName } = verifyJwt(token)
        req.user = { _id: sub, username, role, summonerName };
        console.log('estoy en el middleWare', req.user)
    } else {
        res.sendStatus(401);
        return;
    }

    next();
}

module.exports = validateToken;
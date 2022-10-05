const jwt = require('jsonwebtoken');

const PRIVATEKEY = process.env.PRIVATE_KEY


const signJwt = (idUser, username, summonerName, role, favChamp) => {
    return jwt.sign({ username, summonerName, role, favChamp }, PRIVATEKEY, { expiresIn: '7d', subject: idUser });
};

const verifyJwt = (token) => {
    return jwt.verify(token, PRIVATEKEY);
}

module.exports = {
    signJwt,
    verifyJwt
}
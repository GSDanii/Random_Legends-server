const UserModel = require('../models/User.model')
const { signJwt } = require('../utils/jwt.utils');
const bcrypt = require('bcryptjs')


const createUser = (req, res, next) => {
    const { username, password, summonerName } = req.body;
    UserModel.findOne({ username })
        .then((user) => {
            if (user) {
                console.log('ME GUSTARÍA SABER SI ENTRO AQUÍ')
                throw new Error('Name or password incorrect, please try again.');
            }

            return UserModel.create({ username, password, summonerName })

        })
        .then(() => res.sendStatus(201))
        .catch((err) => {
            if (err.message === 'Name or password incorrect, please try again.') {
                res.status(400).json({ errorMessage: err.message });
                return;
            }
            next(err);
        });
}

const login = (req, res, next) => {
    const { username, password } = req.body;
    UserModel
        .findOne({ username })
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ token: signJwt(user._id.toString(), user.username) });
            }
            else {
                res.status(200).json({ errorMessage: 'Email o contraseña MODIFICADA.' });
            }
        })
        .catch(next);
};


const getUser = (req, res, next) => {
    if (req.user) {
        UserModel.findById(req.user._id).then((user) => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.sendStatus(404);
            }
        })
    } else {
        res.sendStatus(401);
    }
}


module.exports = {
    getUser,
    createUser,
    login
};

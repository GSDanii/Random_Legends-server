const UserModel = require('../models/User.model')


const createUser = (req, res, next) => {
    const { username, password, summonerName } = req.body;

    UserModel.create({ username, password, summonerName })
        .then(() => res.sendStatus(201))
        .catch((err) => {
            res.status(400).json({ messageError: 'Ha ocurrido un error' });
        });
};

const login = (req, res, next) => {
    const { username, password } = req.body;
    UserModel
        .findOne({ username })
        .then((user) => {
            if (user) {
                if (user.comparePassword(password)) {
                    req.session.user = user;
                    res.sendStatus(200);
                }
                else {
                    res.status(400).json({ messageError: 'Username or password invalid' })
                }
            } else {
                res.status(400).json({ messageError: 'Username or password invalid' })
            }
        })
        .catch(e => next(e))
};

module.exports = {
    createUser,
    login
};

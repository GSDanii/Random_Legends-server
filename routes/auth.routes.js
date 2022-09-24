const router = require("express").Router();
const UserModel = require("../models/User.model")

router.get('/signUp', (req, res, _next) => res.render('auth/signup'))

router.get('/login', (req, res, next) => res.render('auth/login'))

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

router.post('/signUp', (req, res) => {
    const { username, password, summonerName } = req.body;

    UserModel.create({ username, password, summonerName })
        .then(() => res.redirect('/auth/login'))
        .catch((err) => {
            res.render('auth/signup', { messageError: 'Ha ocurrido un error' });
        });
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    UserModel
        .findOne({ username })
        .then((user) => {
            if (user) {
                if (user.comparePassword(password)) {
                    req.session.user = user;
                    res.redirect(`/profile/${user._id}`);
                }
                else {
                    res.render('auth/login', {
                        messageError: 'Username or password invalid',
                    });
                }
            } else {
                res.render('auth/login', {
                    messageError: 'Username or password invalid',
                });
            }
        })
        .catch(e => next(e))
});

module.exports = router
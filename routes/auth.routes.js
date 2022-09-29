const router = require("express").Router();
const { createUser, login, getUser } = require('../controller/auth.controller');
const validateToken = require('../middlewares/validateToke.middleware');

router.get('/me', validateToken, getUser)

router.post('/signUp', createUser)

router.post('/login', login)

module.exports = router
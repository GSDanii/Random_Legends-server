const router = require("express").Router();
const UserModel = require('../models/User.model')
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const apiRiotService = require("../services/api-riot.service")

//GET ROUTES

router.get('/summoners', roleValidation([CHALLENGER]), (req, res, next) => {
    UserModel
        .find()
        .then(allSummoners => res.render('profile/summoners-list', { allSummoners }))
        .catch((err) => next(err));
});

router.get('/:id', userValidation(ROLES), (req, res, next) => {
    let lvl
    let info
    const { id: userID } = req.params

    apiRiotService
        .getSummonerInfo(req.session.user.summonerName)
        .then(userInfo => {
            const { summonerLevel, id: summonerID } = userInfo
            lvl = summonerLevel
            return apiRiotService.getSummonerElo(summonerID)
        })
        .then(infoElo => {
            info = infoElo
            return UserModel.findById(userID)
        })
        .then(foundUser => {
            let infoUser = { lvl, info, foundUser }
            res.render('profile/myProfile', infoUser)
        })
        .catch((err) => next(err));
})

router.get("/:id/update", (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => res.render("profile/profile-update", user))
        .catch((err) => next(err))
})

router.get("/:id/adminUpdate", (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => res.render("profile/adminUpdate", user))
        .catch((err) => next(err))
})

router.get("/:id/delete", (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(() => res.redirect('/auth/signup'))
        .catch((err) => next(err))
})

//POST ROUTES

router.post("/:id/update", (req, res, next) => {
    const { username, summonerName } = req.body

    UserModel.findByIdAndUpdate(req.params.id, { username, summonerName })
        .then((user) => res.redirect(`/profile/${user._id}`))
        .catch((err) => next(err))
})

router.post("/:id/adminUpdate", (req, res, next) => {
    const { username, summonerName, role } = req.body

    UserModel.findByIdAndUpdate(req.params.id, { username, summonerName, role })
        .then(() => res.redirect(`/profile/summoners`))
        .catch((err) => next(err))
})

module.exports = router



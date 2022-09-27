const UserModel = require('../models/User.model')
const apiRiotService = require("../services/api-riot.service")


const getAllUsers = (req, res, next) => {
    UserModel
        .find()
        .then(allUsers => {
            res.status(200).json(allUsers)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const userProfile = (req, res, next) => {
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
            res.status(200).json(infoUser)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const userProfileUpdate = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const userProfileUpdateAdmin = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const deleteUser = (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.sendStatus(204)
            // res.redirect('/auth/signup')
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const userUpdate = (req, res, next) => {
    const { username, summonerName } = req.body

    UserModel.findByIdAndUpdate(req.params.id, { username, summonerName })
        .then((user) => {
            res.sendStatus(200)
            // res.redirect(`/profile/${user._id}`)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const adminUpdate = (req, res, next) => {
    const { username, summonerName, role } = req.body

    UserModel.findByIdAndUpdate(req.params.id, { username, summonerName, role })
        .then(() => {
            res.sendStatus(200)
            // res.redirect(`/profile/summoners`)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

module.exports = {
    getAllUsers,
    userProfile,
    userProfileUpdate,
    adminUpdate,
    userUpdate,
    deleteUser,
    userProfileUpdateAdmin
};
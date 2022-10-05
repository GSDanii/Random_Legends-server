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
    const { summonerName } = req.user
    apiRiotService
        .getSummonerInfo(summonerName)
        .then(userInfo => {
            const { summonerLevel, id: summonerID } = userInfo
            lvl = summonerLevel
            return apiRiotService.getSummonerElo(summonerID)
        })
        .then(infoElo => {
            info = infoElo
            return UserModel.findById(userID).populate('favChamp', 'id name title')
        })
        .then(foundUser => {
            let infoUser = { lvl, info, foundUser }
            res.status(200).json(infoUser)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

// TODO unificar controllers
//--
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
//--

const deleteUser = (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

// const userUpdate = (req, res, next) => {
//     const { username, summonerName } = req.body

//     UserModel.findByIdAndUpdate(req.params.id, { username, summonerName })
//         .then((user) => {
//             res.sendStatus(200)
//         })
//         .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
// }

const userUpdate = (req, res, next) => {

    const { username, summonerName, role } = req.body

    const update = {
        username, summonerName
    }

    if (req.user.role === 'CHALLENGER') {
        update.role = role;
    }

    UserModel.findByIdAndUpdate(req.params.id, update)
        .then(() => {
            res.sendStatus(200)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const addFavChamp = (req, res, next) => {

    const { champId, fav } = req.body
    const { _id, favChamp } = req.user
    const addOrPull = fav ? '$pull' : '$addToSet';


    UserModel
        .findByIdAndUpdate(_id, { [addOrPull]: { favChamp: champId } })
        .then(() => {
            console.log('llego aqui?')
            res.sendStatus(200)
        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))

}

module.exports = {
    getAllUsers,
    userProfile,
    userProfileUpdate,
    userUpdate,
    deleteUser,
    userProfileUpdateAdmin,
    addFavChamp
};
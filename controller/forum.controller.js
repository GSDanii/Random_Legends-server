const { CHALLENGER } = require("../const/user.const")
const { checkRoleUser, checkUser } = require('../utils/checkUsers')
const PostModel = require('../models/Post.model')

const allPosts = (req, res, next) => {
    PostModel
        .find()
        .then(AllPosts => res.status(200).json(AllPosts))
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const viewPost = (req, res, next) => {
    let canView = false
    PostModel
        .findById(req.params.idPost)
        .populate('user', 'username role -_id')
        .then((post) => {
            const { user } = req.session;
            if (checkUser(user.username, post.user.username) || checkRoleUser(user.role, CHALLENGER)) {
                canView = true
            }

        })
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const createPost = (req, res, next) => {
    const { description, imgChamp, imgItems, title, user } = req.body
    // const user = req.session.user._id
    PostModel.create({ user, description, imgChamp, imgItems, title })
        .then(() => res.sendStatus(201))
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const deletePost = (req, res, next) => {
    PostModel.findByIdAndDelete(req.params.idPost)
        .then(() => res.sendStatus(204))
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}


module.exports = {
    allPosts,
    viewPost,
    createPost,
    deletePost
};

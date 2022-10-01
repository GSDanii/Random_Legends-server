const { CHALLENGER } = require("../const/user.const")
const { checkRoleUser, checkUser } = require('../utils/checkUsers')
const PostModel = require('../models/Post.model')
const CommentModel = require('../models/Comment.model.js')

const allPosts = (req, res, next) => {
    PostModel
        .find()
        .then(AllPosts => res.status(200).json(AllPosts))
        .catch((err) => res.status(400).json({ messageError: 'Ha ocurrido un error' }))
}

const viewPost = (req, res, next) => {
    const { _id, username, role, summonerName } = req.user
    let canView = false
    PostModel
        .findById(req.params.idPost)
        .populate('user', 'username role -_id')
        .populate({ path: 'comment', populate: { path: 'user', } })
        .then((post) => {
            if (checkUser(username, post.user.username) || checkRoleUser(role, CHALLENGER)) {
                canView = true
            }
            res.status(200).json({ post, canView })

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

const createComment = (req, res, next) => {
    let idComment
    const { user, comment, post } = req.body
    CommentModel.create({ user, comment, post })
        .then((newComment) => {
            res.status(201)
            return PostModel.findByIdAndUpdate(post, { $push: { comment: newComment._id } })
        })
        .then(() => {
            res.sendStatus(200)
        })
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
    createComment,
    deletePost
};

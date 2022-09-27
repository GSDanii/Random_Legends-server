const router = require("express").Router();
const { allPosts, viewPost, createPost, deletePost } = require('../controller/forum.controller');


router.get('/', allPosts)

router.get('/:idPost', viewPost)

router.post('/post', createPost)

router.delete('/:idPost/delete', deletePost)

module.exports = router

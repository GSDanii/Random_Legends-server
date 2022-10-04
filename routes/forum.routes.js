const router = require("express").Router();
const { allPosts, viewPost, createPost, createComment, deletePost } = require('../controller/forum.controller');
const validateToken = require('../middlewares/validateToke.middleware');

router.get('/', allPosts)

router.get('/:idPost', validateToken, viewPost)

router.post('/post', validateToken, createPost)

router.post('/comment', validateToken, createComment)

// TODO remove delete (path) no el metodo 
router.delete('/:idPost/delete', validateToken, deletePost)

module.exports = router

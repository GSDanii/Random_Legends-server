const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const apiRiotService = require("../services/api-riot.service")
const validateToken = require('../middlewares/validateToke.middleware')
const { getAllUsers,
    userProfile,
    userProfileUpdate,
    userUpdate,
    deleteUser,
    userProfileUpdateAdmin
} = require('../controller/profile.controller');


router.get('/users', validateToken, getAllUsers)

router.get('/:id', validateToken, userProfile)

router.get("/:id/update", validateToken, userProfileUpdate)

router.get("/:id/adminUpdate", validateToken, userProfileUpdateAdmin)


// TODO: unificar ambas rutas en una sola.
//--
router.put("/:id/update", validateToken, userUpdate)

//--

router.delete("/:id/delete", deleteUser)

module.exports = router



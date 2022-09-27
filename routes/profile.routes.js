const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const apiRiotService = require("../services/api-riot.service")
const { getAllUsers,
    userProfile,
    userProfileUpdate,
    adminUpdate,
    userUpdate,
    deleteUser,
    userProfileUpdateAdmin
} = require('../controller/profile.controller');


router.get('/users', roleValidation([CHALLENGER]), getAllUsers)

router.get('/:id', userValidation(ROLES), userProfile)

router.get("/:id/update", userProfileUpdate)

router.get("/:id/adminUpdate", userProfileUpdateAdmin)

router.delete("/:id/delete", deleteUser)

router.put("/:id/update", userUpdate)

router.put("/:id/adminUpdate", adminUpdate)

module.exports = router



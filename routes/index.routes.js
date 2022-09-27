const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const { champNameAndImg,
  randomChampAndItems,
  weeklyRotation,
  championDetails
} = require('../controller/index.controller');



router.get("/championsList", champNameAndImg)

router.get("/randomPick", roleValidation(ROLES), randomChampAndItems)

router.get("/weeklyRotation", roleValidation(ROLES), weeklyRotation);

router.get("/champion-details/:championName", roleValidation(ROLES), championDetails)


module.exports = router;




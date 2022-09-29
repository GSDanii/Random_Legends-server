const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const { champNameAndImg,
  randomChampAndItems,
  weeklyRotation,
  championDetails
} = require('../controller/index.controller');
const validateToken = require('../middlewares/validateToke.middleware');



router.get("/championsList", champNameAndImg)

router.get("/randomPick", randomChampAndItems)

router.get("/weeklyRotation", weeklyRotation);

router.get("/champion-details/:championName", championDetails)


module.exports = router;




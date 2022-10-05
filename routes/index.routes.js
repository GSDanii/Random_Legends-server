const router = require("express").Router();
const { roleValidation, userValidation } = require('../middlewares/roles.middlewares');
const { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER, ROLES } = require("../const/user.const")
const { champNameAndImg,
  searchChamps,
  randomChampAndItems,
  weeklyRotation,
  championDetails,
  allChamps
} = require('../controller/index.controller');
const validateToken = require('../middlewares/validateToke.middleware');



router.get("/championsList", champNameAndImg)

router.get('/searchChamp', searchChamps)

router.get("/randomPick", validateToken, randomChampAndItems)

router.get("/weeklyRotation", weeklyRotation);

router.get("/champion-details/:championName", championDetails)

router.get("/checkBox", validateToken, allChamps)


module.exports = router;




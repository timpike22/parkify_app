const router = require("express").Router();
const driversController = require("../../controller/driver");

//Matches with "/api/drivers"
router.route("/")
    .get(driversController.findAll)
    .post(driversController.create);

//Matches with "/api/drivers/:id"
router.route("/id/:id")
    .get(driversController.findById)
    .put(driversController.update)
    .delete(driversController.remove);

router.route("/loginout/")
    .post(driversController.login)
    .get(driversController.logout);

router.route("/authenticate/")
    .get(driversController.authenticate);

module.exports = router;
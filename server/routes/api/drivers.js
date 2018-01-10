const router = require("express").Router();
const driversController = require("../../controller/driver");

//Matches with "/api/drivers"
router.route("/")
    .get(driversController.findAll)
    .post(driversController.create);

//Matches with "/api/drivers/:id"
router.route("/:id")
    .get(driversController.findById)
    .put(driversController.update)
    .delete(driversController.remove);

router.route("/driver/")
    .post(driversController.login)
    .get(driversController.logout);

router.route("/driver/authenticate")
    .get(driversController.authenticate);

module.exports = router;
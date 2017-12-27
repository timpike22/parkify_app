const router = require("express").Router();
const driversController = require("../../Controller/driver");

//Matches with "/api/drivers"
router.route("/")
    .get(driversController.findAll)
    .post(driversController.create);

//Matches with "/api/drivers/:id"
router
    .route("/:id")
    .get(driversController.findById)
    .put(driversController.update)
    .delete(driversController.remove);

module.exports = router;

const router = require("express").Router();
const vehiclesController = require("../../Controller/vehicle");

//Matches with "/api/vehicles"
router.route("/")
    .get(vehiclesController.findAll)
    .post(vehiclesController.create);

//Matches with "/api/vehicles/:id"
router
    .route("/:id")
    .get(vehiclesController.findById)
    .put(vehiclesController.update)
    .delete(vehiclesController.remove);

module.exports = router;
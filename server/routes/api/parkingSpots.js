const router = require("express").Router();
const parkingSpotsController = require("../../controller/parkingSpot");

//Matches with "/api/parkingSpots"
router.route("/")
    .get(parkingSpotsController.findAll)
    .post(parkingSpotsController.create)
    .get(parkingSpotsController.findNear);

//Matches with "/api/parkingSpots/:id"
router
    .route("/:id")
    .get(parkingSpotsController.findById)
    .put(parkingSpotsController.update)
    .delete(parkingSpotsController.remove);

module.exports = router;
const router = require("express").Router();
const rentalsController = require("../../controller/rental");

//Matches with "/api/rentals"
router.route("/")
    .get(rentalsController.findAll)
    .post(rentalsController.create);

//Matches with "/api/rentals/:id"
router
    .route("/:id")
    .get(rentalsController.findById)
    .put(rentalsController.update)
    .delete(rentalsController.remove);

module.exports = router;
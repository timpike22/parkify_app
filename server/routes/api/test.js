const router = require("express").Router();
const testController = require("../../controller/test");

//Matches with "/api/drivers"
router.route("/")
    .get(testController.findAll)
    .post(testController.create);

//Matches with "/api/drivers/:id"
router
    .route("/:id")
    .get(testController.findById)
    .put(testController.update)
    .delete(testController.remove);

module.exports = router;
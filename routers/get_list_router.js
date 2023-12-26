const router = require("express").Router();
const getListController = require("../controllers/get_list_controller");

router.post("/get-list", getListController.getList);

module.exports = router;
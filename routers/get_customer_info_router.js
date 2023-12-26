const router = require("express").Router();
const getCustomerInfoController = require("../controllers/get_customer_info_controller");

router.get("/get-customer-info", getCustomerInfoController.getCustomerInfo);

module.exports = router;
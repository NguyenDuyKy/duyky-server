const router = require("express").Router();
const eventUrlController = require('../controllers/event_url_controller');

router.post("/", eventUrlController.event);

module.exports = router;
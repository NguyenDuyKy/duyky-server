const router = require("express").Router();
const chatgptController = require('../controllers/chatgpt_controller');

router.post('/chatgpt', chatgptController.sendMessage);

module.exports = router;
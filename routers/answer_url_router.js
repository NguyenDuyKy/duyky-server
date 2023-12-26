const router = require("express").Router();
const answerUrlController = require("../controllers/answer_url_controller");

router.get("/project", answerUrlController.project);
router.get("/number", answerUrlController.number);
router.post("/onfail1", answerUrlController.numberOnFail1);
router.post("/onfail2", answerUrlController.numberOnFail2);

module.exports = router;
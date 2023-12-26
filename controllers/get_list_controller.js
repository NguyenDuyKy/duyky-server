const axios = require("axios");
const token = require("../token/token");
const isBusinessHour = require("../utils/business_hour")();
var answerTimeout = 10;
var restToken = token(true, null, null);

const getListController = {
    getList: async (req, res) => {
        try {
            const agentData = await axios.get("https://icc-api.stringee.com/v1/agent?access_token=" + restToken);
            availableAgentList = await agentData.data.data.agents.filter(agent => agent.manual_status === "AVAILABLE");
            var resObj = {
                "version": 2,
                "calls": []
            };
            for (var i = 0; i < req.body.calls.length; i++) {
                var callObj = {
                    "callId": "",
                    "agents": []
                }
                for (var j = 0; j < availableAgentList.length; j++) {
                    var agentObj = {
                        "stringee_user_id": availableAgentList[j].stringee_user_id,
                        "phone_number": availableAgentList[j].phone_number,
                        "routing_type": isBusinessHour ? 1 : 2,
                        "answer_timeout": answerTimeout
                    }
                    callObj.agents.push(agentObj);
                }
                callObj.callId = req.body.calls[i].callId;
                resObj.calls.push(callObj);
            }
            return res.status(200).json(resObj);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

module.exports = getListController;
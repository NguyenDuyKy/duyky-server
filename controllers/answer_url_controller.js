const axios = require("axios");
const token = require("../token/token");
const utils = require("../utils/utils");
const url = require("url");

var recordAction = {
    "action": "record",
    "format": ""
};
var connectAction = {
    "action": "connect",
    "from": {
        "type": "",
        "number": "",
        "alias": ""
    },
    "to": {
        "type": "",
        "number": "",
        "alias": ""
    },
    "customData": "", //Custom data (String) is sent to the client"s app when the client makes a call or receives an incoming call.
    "timeout": null, //If the call is unanswered, set the number in seconds before Stringee stops ringing.
    "continueOnFail": false,  //If true, Stringee sends a POST request to the onFailEventUrl.
    "onFailEventUrl": "",
    "maxConnectTime": -1, //Maximum length of the call in seconds.
    "peerToPeerCall": false
};

const answerUrlController = {
    project: async (req, res) => {
        try {
            var projectRecordAction = { ...recordAction };
            var projectConnectAction = { ...connectAction };
            var queryObj = url.parse(req.originalUrl, true);
            projectConnectAction.from.type = "internal";
            projectConnectAction.from.number = queryObj.query.from;
            projectConnectAction.from.alias = queryObj.query.from;
            projectConnectAction.to.number = queryObj.query.to;
            projectConnectAction.to.alias = queryObj.query.to;
            projectConnectAction.timeout = parseInt(process.env.PROJECT_TIME_OUT);
            if (utils.isPhoneNumberVietnam(queryObj.query.to)) {
                projectRecordAction.format = "mp3";
                projectConnectAction.to.type = "external";
            } else {
                if (queryObj.query.videocall === "true") {
                    projectRecordAction.format = "webm";
                    projectConnectAction.to.type = "internal";
                } else {
                    projectRecordAction.format = "mp3";
                    projectConnectAction.to.type = "internal";
                }
            }
            return res.status(200).json([projectRecordAction, projectConnectAction]);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    number: async (req, res) => {
        try {
            var queryObj = url.parse(req.originalUrl, true);
            var scco = phoneToAppSCCO(queryObj.query, "4444", "https://duyky-server.cyclic.app/answer-url/onfail1", true);
            return res.status(200).json(scco);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    numberOnFail1: async (req, res) => {
        try {
            var scco = phoneToAppSCCO(req.body.from, "5555", "https://duyky-server.cyclic.app/answer-url/onfail2", true);
            return res.status(200).json(scco);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    numberOnFail2: async (req, res) => {
        try {
            var scco = phoneToAppSCCO(req.body.from, "6666", "", false);
            return res.status(200).json(scco);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

function phoneToAppSCCO(request, userId, onFailEventUrl, isContinue) {
    var record = { ...recordAction };
    var connect = { ...connectAction };
    record.format = "mp3";
    connect.from.type = "external";
    connect.from.number = request.from || request.number;
    connect.from.alias = request.from || request.number;
    connect.to.type = "internal";
    connect.to.number = userId;
    connect.to.alias = userId;
    connect.timeout = process.env.NUMBER_TIME_OUT;
    if (isContinue) {
        connect.continueOnFail = true;
        connect.onFailEventUrl = onFailEventUrl;
    }
    return [record, connect];
}

module.exports = answerUrlController;


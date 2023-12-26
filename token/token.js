const jwt = require("jsonwebtoken");
const apiKeySid = process.env.STRINGEE_SID_KEY;
const apiKeySecret = process.env.STRINGEE_SECRET_KEY;

function getAccessToken(isRestToken, isIccToken, userId) {
    var now = Math.floor(Date.now() / 1000);
    var exp = now + 3600;
    var header = { cty: "stringee-api;v=1" };
    var payload = {
        jti: apiKeySid + "-" + now,
        iss: apiKeySid,
        exp: exp,
    };
    if (isRestToken) {
        payload = { ...payload, rest_api: true };
    } else {
        if (isIccToken) {
            payload = { ...payload, icc_api: true, userId: userId };
        } else {
            payload = { ...payload, userId: userId };
        }
    }
    var token = jwt.sign(payload, apiKeySecret, { algorithm: "HS256", header: header })
    return token;
}

module.exports = getAccessToken;
const crypto = require('crypto');
const secretKey = process.env.STRINGEE_SECRET_KEY;

const eventUrlController = {
    event: async (req, res) => {
        try {
            // const xStringeeSignatureBase64 = req.headers["x-stringee-signature"];
            // console.log(JSON.stringify(req.headers));
            // console.log(JSON.stringify(req.body));
            // console.log(xStringeeSignatureBase64);
            // const data = JSON.stringify(req.body);
            // var computedSignature = hmacSHA1(secretKey, data);
            // console.log(computedSignature);
            return res.status(200).json({ msg: "OK" });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

function hmacSHA1(key, data) {
    return crypto.createHmac('sha1', key).update(data).digest('base64');
}

module.exports = eventUrlController;
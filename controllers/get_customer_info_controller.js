const url = require("url");

const getCustomerInfoController = {
    getCustomerInfo: async (req, res) => {
        try {
            var queryObj = url.parse(req.originalUrl, true);
            console.log(queryObj.query);
            return res.status(200).json({ msg: "OK" });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};

module.exports = getCustomerInfoController;

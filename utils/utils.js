function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
}

function isPhoneNumberVietnam(phoneNumber) {
    const regex = /^(0[2-9][0-9]{8,9})|(84[2-9][0-9]{8,9})|(1900[0-9]{4})|(1800[0-9]{4})$/;
    return regex.test(phoneNumber);
}

module.exports = {
    parseQuery: parseQuery,
    isPhoneNumberVietnam: isPhoneNumberVietnam
};
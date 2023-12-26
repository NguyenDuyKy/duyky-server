const now = new Date();
const currentHour = now.getHours();
const currentMinute = now.getMinutes();
const isBusinessHour = currentHour >= 8 && (currentHour < 17 || (currentHour === 17 && currentMinute === 0));

function checkBusinessHour() {
    if (isBusinessHour) {
        return true;
    } else {
        return false;
    }
}

module.exports = checkBusinessHour;
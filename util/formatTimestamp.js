const moment = require('moment');

const formatTimestamp = (timestamp) => {
    return moment(timestamp).format('YYYY-MM-DD h:mm:ss a');
};

const getCurrentTimestamp = () => {
    return moment().format('YYYY-MM-DD h:mm:ss a');
};

module.exports = { formatTimestamp, getCurrentTimestamp };
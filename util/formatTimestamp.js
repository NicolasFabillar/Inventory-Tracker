const moment = require('moment');

const formatTimestamp = (timestamp) => {
    return moment(timestamp).format('YYYY-MM-DD h:mm:ss a');
};

const getCurrentTimestamp = () => {
    return moment().format('YYYY-MM-DD h:mm:ss a');
};

const getStartOfToday = () => {
  return moment().startOf("day").toDate();
};

const getCurrentDate = () => {
  return moment().toDate();
};

module.exports = { formatTimestamp, getCurrentTimestamp, getStartOfToday, getCurrentDate};
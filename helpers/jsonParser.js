const errorHandler = require('../util/errorHandler');

module.exports = (req, res, next) => {
    const { data } = req.body;
    try {
        req.body.data = JSON.parse(data);
        next();
    } catch (err){
        errorHandler("Invalid JSON data", 500);
    }
}
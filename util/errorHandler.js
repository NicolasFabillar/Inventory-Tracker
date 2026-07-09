const errorHandler = (msg, statusCode, data) => {
    const error = new Error(msg);
    error.statusCode = statusCode;
    error.data = data;
    throw error;
}

module.exports = errorHandler;
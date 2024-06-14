const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).send({
        success: false,
        error: 'Something went wrong',
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorHandler;

const errorMiddleware = (err, req, res, next) => {
    res.status(500).send('Something failed.');
};

module.exports = errorMiddleware;

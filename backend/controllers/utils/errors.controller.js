exports.error404 = (err, res) => {
    res.status(404).send({
        message:
            err.message || "Could not be found"
    });
};

exports.error400 = (err, res) => {
    res.status(400).send({
        message:
            err.message || "Data Error"
    });
};

exports.error500 = (err, res) => {
    res.status(500).send({
        message:
            err.message || "Server failed to handle request"
    });
};
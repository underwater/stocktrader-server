//TODO: Is there a way to do injection of the repository?
const getInstruments = require('../data/repository');

const getInstruments = (req, res) => {
    return res
    .status(200)
    .json(getInstruments());
};

module.exports = {
    getInstruments
};

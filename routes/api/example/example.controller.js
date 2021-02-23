const { successApi } = require('../../../helpers/response')

const index = async (req, res) => {
    const dummyData = {
        name: "dummy",
        age: "20",
        location: "asgardian"
    }

    res.json(
        successApi('sucessfully get example data', dummyData)
    );
}

module.exports = {
    index
}
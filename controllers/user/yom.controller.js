const yomModel = require('../../models/user/yom.model');

const home = async (req, res) => {
    try {
        const data = await yomModel.find({})
        res.render('user/index',{data})
    } catch (error) {
        return console.log(error.message);
    }
}


module.exports = { home }
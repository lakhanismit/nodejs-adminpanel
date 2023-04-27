const yomModel = require('../../models/user/yom.model');
const recentPostModel = require('../../models/user/recentpost.model');

const home = async (req, res) => {
    try {
        const data = await yomModel.find({})
        const postData = await recentPostModel.find({}).sort({ _id: -1 })
        res.render('./user/index', { data, postData })
    } catch (error) {
        return console.log(error.message);
        
    }
}


module.exports = { home }
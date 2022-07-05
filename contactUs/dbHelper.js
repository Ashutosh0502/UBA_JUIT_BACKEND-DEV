const contactUs = require('./model');
const contactUsDbHelper = {};


contactUsDbHelper.save = async (contactUsInput) => {
    try {
        const model = new contactUs(contactUsInput);
        await model.save();

    } catch (err) {
        return Promise.reject(err);
    }
}


contactUsDbHelper.getAll = async () => {
    try {
        return contactUs.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = contactUsDbHelper;



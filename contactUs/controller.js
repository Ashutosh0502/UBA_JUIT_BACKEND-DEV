const dbHelper = require('./dbHelper');

const contactUs = {};



contactUs.add = async (req) => {
    try {
        return await dbHelper.save(req.body);
    } catch (err) {
        return Promise.reject(err);
    }
}


contactUs.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}



module.exports = contactUs;
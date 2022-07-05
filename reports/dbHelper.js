const report = require('./model');

const reportDbHelper = {};

reportDbHelper.uploadReport = async (reportInput) => {
    try {
        const model = new report(reportInput);
        await model.save();
    } catch (err) {
        return Promise.reject(err);
    }
}

reportDbHelper.getAll = async () => {
    try {
        return report.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

reportDbHelper.deleteReport = async (id) => {
    try {
        await report.deleteOne({ _id: id });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = reportDbHelper;
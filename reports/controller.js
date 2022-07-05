const dbHelper = require('./dbHelper');
const viewModel = require('./viewModel');

const reports = {};

reports.uploadReport = async (req) => {
    try {
        const userViewModel = viewModel.createViewModel({ ...req.body }, req.files);
        await dbHelper.uploadReport(userViewModel);
        return { msg: 'report uploaded successfully.' };
    } catch (err) {
        return Promise.reject(err);
    }
}

reports.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}

reports.deleteReport = async (id) => {
    try {
        return await dbHelper.deleteReport(id);
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = reports;



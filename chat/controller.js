import dbHelper from './dbHelper';

const chat = {};

chat.add = async (req) => {
    try {
        await dbHelper.save(req.body);
        return { msg: 'saved' };
    } catch (err) {
        return Promise.reject(err);
    }
}


chat.update = async (req) => {
    try {
        const viewModel = {
            userId: req.body.userId,
            idea: req.body.idea
        }

        return await dbHelper.update(req.body.id, viewModel);
    } catch (err) {
        return Promise.reject(err);
    }
}

chat.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}

chat.updateStatus = async (req) => {
    try {
        return await dbHelper.updateStatus(req.body.id);
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = chat;
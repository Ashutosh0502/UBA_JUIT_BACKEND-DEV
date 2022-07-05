const chat = require('./model');
const { STATUS } = require('./const');

const chatDbHelper = {};

chatDbHelper.save = async (chatInput) => {
    try {
        const model = new chat(chatInput);
        await model.save();
    } catch (err) {
        return Promise.reject(err);
    }
}

chatDbHelper.update = async (id, viewModel) => {
    try {
        const comment = { userId: viewModel.userId, idea: viewModel.idea };
        await chat.updateOne({ _id: id },
            {
                $push: { comments: comment }
            })
    } catch (err) {
        return Promise.reject(err);
    }
}

chatDbHelper.getAll = async () => {
    try {
        return chat.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

chatDbHelper.updateStatus = async (id) => {
    try {
        await chat.updateOne({ _id: id }, { status: STATUS[1] });
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = chatDbHelper;
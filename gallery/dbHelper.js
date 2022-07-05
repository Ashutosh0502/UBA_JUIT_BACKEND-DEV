const gallery = require('./model');

const galleryDbHelper = {};

galleryDbHelper.save = async (galleryInput) => {
    try {
        const model = new gallery(galleryInput);
        await model.save();
    } catch (err) {
        return Promise.reject(err);
    }
}

galleryDbHelper.delete = async (id) => {
    try {
        await gallery.deleteOne({ _id: id });
    } catch (err) {
        return Promise.reject(err);
    }
}

galleryDbHelper.getAll = async () => {
    try {
        return gallery.find({})
            .exec()
            .then((results) => {
                return results;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = galleryDbHelper;
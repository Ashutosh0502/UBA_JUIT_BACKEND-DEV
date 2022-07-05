const viewModel = require('./viewModel');
import dbHelper from './dbHelper';

const gallery = {};

gallery.add = async (req) => {
    try {
        const galleryViewModel = viewModel.createViewModel({ ...req.body }, req.files);
        await dbHelper.save(galleryViewModel);
        return { msg: 'gallery created' };
    } catch (err) {
        return Promise.reject(err);
    }
}

gallery.delete = async (id) => {
    try {
        return await dbHelper.delete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

gallery.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = gallery;
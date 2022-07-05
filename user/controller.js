const dbHelper = require('./dbHelper');
const viewModel = require('./viewModel');
import { ROLES, PASSWORDRESTSUCESSFULLY } from './const';
const users = {};
import {
    sendMail, passwordUpdateOption,
    resetPasswordOption, decodeString
} from '../helper/sendGridEMail';

users.add = async (req) => {
    try {

        if (req.body.role == 'ubaMember') {
            const userViewModel = viewModel.createViewModel({ ...req.body }, req.files);
            const res = await dbHelper.save(userViewModel);
            return res;
        } else {
            const res = await dbHelper.save(req.body);
            return res;
        }

    } catch (err) {
        return Promise.reject(err);
    }
}

users.addAdmin = async () => {
    try {
        const name = process.env.adminUsername;
        const password = process.env.adminPassword;
        const role = ROLES[0];
        const email = process.env.adminEmail;
        const mobileNo = process.env.adminPhone;

        const body = {
            email, password,
            name, role,
            active: true,
            mobileNo
        }
        return await dbHelper.save(body);
    } catch (err) {
        return Promise.reject(err);
    }
}


users.validate = async (model) => {
    try {
        return await dbHelper.validate(model);
    } catch (err) {
        return Promise.reject(err);
    }
}

users.logOut = async (id) => {
    try {
        return await dbHelper.logOut(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

users.sendForgetEmail = async (body) => {
    try {
        const userInfo = await dbHelper.getUsersByEmail(body.email);
        await sendMail(resetPasswordOption(userInfo));
    } catch (err) {
        return Promise.reject(err);
    }
}

users.changePassword = async (body) => {
    try {
        const decodedId = decodeString(body.id.toString());
        const userInfo = await dbHelper.getUsersById(decodedId);
        await dbHelper.changePassword(decodedId, body);
        await sendMail(passwordUpdateOption(userInfo));
        return PASSWORDRESTSUCESSFULLY;
    } catch (err) {
        return Promise.reject(err);
    }
}

users.update = async (req) => {
    try {
        const userViewModel = viewModel.createViewModel(req.body, req.files);
        return await dbHelper.update(req.body.userId, userViewModel);

    } catch (err) {
        return Promise.reject(err);
    }
}


users.delete = async (id) => {
    try {
        return await dbHelper.delete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}


users.getAll = async () => {
    try {
        return await dbHelper.getAll();
    } catch (err) {
        return Promise.reject(err);
    }
}



module.exports = users;
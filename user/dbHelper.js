const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const users = require('./model');
import { ROLES } from './const';

const usersDbHelper = {};
const defaultPassword = 'juituba123#';

usersDbHelper.save = async (usersInput) => {
    try {
        return users.countDocuments({ email: usersInput.email }).then((count) => {
            if (count === 0) {
                usersInput.password = usersInput.password || defaultPassword;
                return bcrypt.hash(usersInput.password, saltRounds).then((encryptedPassword) => {
                    let newUser = JSON.parse(JSON.stringify(usersInput));
                    newUser.password = encryptedPassword;

                    const obj = new users(newUser);
                    return obj.save().then(() => { return obj; });
                });

            } else {
                return 'email exist';
            }
        });

    } catch (err) {
        return Promise.reject(err);
    }
}


usersDbHelper.validate = async (model) => {
    try {
        return users.findOne({ email: model.email }).exec().then((u) => {
            console.log('model.password, user.password', u);
            if (u) {
                const payload = {
                    userName: u.name, role: u.role,
                    id: u._id,
                    email: u.email
                };
                const options = { expiresIn: '1d', issuer: process.env.ISSUER };

                const secret = process.env.JWT_SECRET;
                const token = jwt.sign(payload, secret, options);


                const match = bcrypt.compareSync(model.password, u.password);
                if (match) {
                    return u.updateOne({ token }).then(() => {

                        return { match, token, payload };
                    });
                }
                return { match };
            }

            return Promise.reject("user not exist");
        });

    } catch (err) {
        return Promise.reject(err);
    }
}

usersDbHelper.logOut = async (id) => {
    try {
        await users.updateOne({ _id: id }, { $set: { token: null } });
    } catch (err) {
        return Promise.reject(err);
    }
}

usersDbHelper.getUsersByEmail = async (email) => {
    try {
        return await users.find({ "email": email })
            .exec()
            .then((results) => {
                return results.length === 1 ? results[0] : {};
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

usersDbHelper.getUsersById = async (id) => {
    try {
        return await users.find({ _id: id })
            .exec()
            .then((results) => {
                return results.length === 1 ? results[0] : null;
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


usersDbHelper.update = async (userId, userViewModel) => {
    try {
        await users.updateOne({ _id: userId },
            {
                name: userViewModel.name,
                mobileNo: userViewModel.mobileNo
                , branch: userViewModel.branch,
                profilePhoto: userViewModel.profilePhoto, modifiedDate: Date.now()
            });
    } catch (err) {
        return Promise.reject(err);
    }
}

usersDbHelper.delete = async (id) => {
    try {
        await users.updateOne({ _id: id }, { active: false });
    } catch (err) {
        return Promise.reject(err);
    }
}


usersDbHelper.getAll = async () => {
    try {
        return users.find({ "active": true, "role": ROLES[1] })
            .exec()
            .then((results) => {
                return results.map((result) => {
                    return result;
                });
            });
    } catch (err) {
        return Promise.reject(err);
    }
}


usersDbHelper.changePassword = async (decodeId, body) => {
    try {
        const id = decodeId;
        const password = body.password;
        return bcrypt.hash(password, saltRounds).then(async (encryptedPassword) => {
            return await users.updateOne({ _id: id }, { $set: { password: encryptedPassword } });
        });

    } catch (err) {
        return Promise.reject(err);
    }
}



module.exports = usersDbHelper;
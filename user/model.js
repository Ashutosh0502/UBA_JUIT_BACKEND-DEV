import { Schema, model } from 'mongoose';
import { ROLES } from './const';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    enrollmentNo: {
        type: String
    },
    branch: {
        type: String
    },
    profilePhoto: {
        type: String
    },
    role: {
        type: String,
        enum: ROLES
    },

    token: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});


module.exports = model("user", userSchema);

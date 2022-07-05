import { Schema, model } from 'mongoose';

const ContactUsSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    phone_Number: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
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

module.exports = model("ContactUs", ContactUsSchema);

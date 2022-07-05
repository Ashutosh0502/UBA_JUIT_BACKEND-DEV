import { Schema, model } from 'mongoose';
import { STATUS } from './const';


const commentSchema = new Schema({
    userId: {
        type: String
    },
    idea: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});


const chatSchema = new Schema({
    villageProblem: {
        type: String,
        required: true
    },
    villageName: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: STATUS,
        default: STATUS[0]
    },
    modifiedDate: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = model("chat", chatSchema);

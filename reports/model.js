import { Schema, model } from 'mongoose';

const reportSchema = new Schema({

    reportName: {
        type: String
    },
    reportFile: {
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


module.exports = model("report", reportSchema);

const mongoose = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const contributionSchema = mongoose.Schema({
    contribution_id : {
        type: Number
    },
    contribution_keyword : {
        type: String,
        required: true,
    },  
    contribution_title : {
        type: String,
        required: true,
        trim: true,
    },
    contribution_url : {
        type: String,
        unique: true
    },
    contribution_content : {
        type: String,
        required: true,
    },
    contribution_date : {
        type: Date,
    },
    status : {
        type: Number,
        default: 100
    },
    hit : {
        type: Number,
        default: 1
    },
    user_email : {
        type: String
    }
}, { versionKey: false });

contributionSchema.plugin(
    autoIncrement.plugin,
    {
        model : 'contributions',
        field : 'contribution_id',
        startAt: 20,
        increment : 1 
    });
const Contribution = mongoose.model("contributions", contributionSchema);

module.exports = { Contribution };

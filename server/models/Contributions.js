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
        unique: true
    },
    contribution_url : {
        type: String,
        required: true,
        unique: true
    },
    contribution_content : {
        type: String,
        required: true,
    },
    contribution_date : {
        type: Date,
        default: Date.now()
    },
    status : {
        type: String,
        default: 'pending'
    },
    hit : {
        type: Number,
        default: 0
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId
    }

});

contributionSchema.plugin(
    autoIncrement.plugin,
    {
        model : 'contributions',
        field : 'contribution_id',
        startAt: 1,
        increment : 1 
    });
const Contribution = mongoose.model("contributions", contributionSchema);

module.exports = { Contribution };


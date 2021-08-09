const mongoose = require("mongoose");

const emailSchema = mongoose.Schema({
    article_id : {
        type: Number
    },
    email_date : {
        type: Date,
        default: Date.now()
    },
    email_content : {
        type: String,
    },
    email_total_recipients : {
        type: Number,
        default: 0
    }

});

const Email = mongoose.model("emails", emailSchema);

module.exports = { Email };


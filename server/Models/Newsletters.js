const mongoose = require("mongoose");

const newsletterSchema = mongoose.Schema({
    newsletter_date: {
        "type": Date,
        "default": Date.now()
    },
	newsletter_content: String,
	newsletter_total_recipients: Number
});

const Newsletter = mongoose.model("newsletters", newsletterSchema);

module.exports = { Newsletter };

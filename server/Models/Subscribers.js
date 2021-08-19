const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
    subscriber_email : {
        type: String,
        required: true,
        unique: true
    }
}, { versionKey: false });

const Subscriber = mongoose.model("subscribers", subscriberSchema);

module.exports = { Subscriber };
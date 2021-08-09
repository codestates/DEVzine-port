const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
    subscriber_email : {
        type: String,
        required: true,
        unique: true
    },  
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        default: null
    }
});

const Subscriber = mongoose.model("subscribers", subscriberSchema);

module.exports = { Subscriber };


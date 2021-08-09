const mongoose = require("mongoose");

const verifiedEmailSchema = mongoose.Schema({
    temp_email : {
        type: String,
        required: true,
        unique: true
    }
});

const VerifiedEmail = mongoose.model("verifiedemails", verifiedEmailSchema);

module.exports = { VerifiedEmail };

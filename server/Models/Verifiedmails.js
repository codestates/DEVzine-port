const mongoose = require("mongoose");

const verifiedMailSchema = mongoose.Schema({
    temp_email : {
        type: String,
        required: true,
        unique: true
    }
});

const VerifiedMail = mongoose.model("verifiedmails", verifiedMailSchema);

module.exports = { VerifiedMail };
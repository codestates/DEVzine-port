const mongoose = require("mongoose");

const statSchema = mongoose.Schema({
    stat_datetime: Date,
    stat_content: Object
}, { versionKey: false });

const Stat = mongoose.model("stats", statSchema);

module.exports = { Stat };

const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, '이름을 입력하시오']
    },
    nickname: {
        type: String,
        required: [true, '별명을 입력하시오']
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Test = mongoose.model("Test2", testSchema);

module.exports = { Test };
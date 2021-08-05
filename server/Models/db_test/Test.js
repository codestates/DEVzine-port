const mongoose = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const testSchema = mongoose.Schema({
    test_id: {
        type: Number,
        required: true,
        default: 0
    },
    test_date: {
        type: Date,
        default: Date.now()
    }
});

testSchema.plugin(
    autoIncrement.plugin,
    {
        model : 'tests',
        field : 'test_id',
        startAt : 0, 
        increment : 1 
    });
const Test = mongoose.model("tests", testSchema);

module.exports = { Test };
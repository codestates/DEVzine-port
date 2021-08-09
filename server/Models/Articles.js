const mongoose = require("mongoose");
let autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const articleSchema = mongoose.Schema({
    article_id : {
        type: Number
    },
    article_title : {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    article_content : {
        type: String,
        required: true,
        trim: true
    },
    article_date : {
        type: Date,
        default: Date.now()
    },
    article_keyword : {
        type: String,
        required: true
    },
    article_url : {
        type: String,
        required: true,
        unique: true
    },
    article_publisher : {
        type: String,
    },
    hit : {
        type: Number,
        default: 0
    }
    
});

articleSchema.plugin(
    autoIncrement.plugin,
    {
        model : 'articles',
        field : 'article_id',
        startAt: 1,
        increment : 1 
    });
const Article = mongoose.model("articles", articleSchema);

module.exports = { Article };

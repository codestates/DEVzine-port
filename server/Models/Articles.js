const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
    // article_id
    // article_title
    // article_content
    // article_date
    // article_keyword
    // article_url
    // publishment
    // hit
});

const Articles = mongoose.model("articles", articleSchema);

module.exports = { Articles };
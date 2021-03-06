const mongoose = require('mongoose');

const newsletterSchema = mongoose.Schema(
  {
    newsletter_date: {
      type: Date,
    },
    newsletter_content: String,
    newsletter_total_recipients: Number,
  },
  { versionKey: false },
);

const Newsletter = mongoose.model('newsletters', newsletterSchema);

module.exports = { Newsletter };

const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
  {
    admin_id: {
      type: String,
      unique: true,
    },
    admin_password: String,
  },
  { versionKey: false },
);

const Admin = mongoose.model('admins', adminSchema);

module.exports = { Admin };

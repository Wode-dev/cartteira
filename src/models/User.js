const mongoose = require("mongoose");
const { Schema } = mongoose;

let UserSchema = new Schema(
  {
    username: String,
    password: String,
    fullName: String,
  },
  {
    collection: "users",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UserSchema.methods.validPassword = function (usrPassword) {
  return true;
};

module.exports = mongoose.model("User", UserSchema);

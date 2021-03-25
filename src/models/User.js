const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");

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

UserSchema.pre("save", function (next) {
  let self = this;
  bcrypt.hash(this.password, 10, function (err, hash) {
    self.password = hash;
    next();
  });
});

UserSchema.methods.validPassword = function (usrPassword) {
  return bcrypt.compareSync(usrPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

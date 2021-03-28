/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        properties:
 *          username:
 *            type: string
 *          password:
 *            type: string
 *          fullName:
 *            type: string
 *          roles:
 *            type: string
 *            enum: [sysadmin, admin]
 *        required:
 *          - username
 *          - password
 *          - fullName
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcryptjs");

let UserSchema = new Schema(
  {
    username: String,
    password: String,
    fullName: String,
    roles: {
      type: String,
      enum: ["sysadmin", "admin"],
    },
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

UserSchema.methods.hasAdminPermissions = function () {
  if (!this.roles) return false;
  else return this.roles.contains("admin") || this.roles.contains("sysadmin");
};

UserSchema.methods.hasSysadminPermissions = function () {
  if (!this.roles) return false;
  else return this.roles.contains("sysadmin");
};

module.exports = mongoose.model("User", UserSchema);

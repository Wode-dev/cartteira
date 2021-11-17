// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

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
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
    email: { type: String, unique: true, lowercase: true },
    password: { type: String },
    auth0Id: { type: String },
    username: String,
    fullName: String,
    roles: {
      type: String,
      enum: ['sysadmin', 'admin'],
    },
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  schema.methods.hasAdminPermissions = function () {
    if (!this.roles) return false;
    else return this.roles.contains('admin') || this.roles.contains('sysadmin');
  };

  schema.methods.hasSysadminPermissions = function () {
    if (!this.roles) return false;
    else return this.roles.contains('sysadmin');
  };

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Wallet:
 *        properties:
 *          name:
 *            type: string
 *          type:
 *            type: string
 *          userId:
 *            type: string
 *        required:
 *          - name
 *          - type
 *          - userId
 */
const Entry = require('./Entry');

module.exports = function (app) {
  const modelName = 'wallets';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    name: String,
    type: String,
    entries: [Entry.schema],
    userId: { type: Schema.Types.ObjectId, ref: 'User' },

  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};

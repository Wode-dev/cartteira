/**
 *  @swagger
 *  components:
 *    schemas:
 *      UserData:
 *        properties:
 *          userId:
 *            type: string
 *          recurrences:
 *            type: Array
 *            items:
 *              $ref: '#/components/schemas/Recurrence'
 *        required:
 *          - userId
 */
const Recurrence = require('./Recurrence');

module.exports = function (app) {
  const modelName = 'user_datas';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    recurrences: [Recurrence.schema],

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

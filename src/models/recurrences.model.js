/**
 *  @swagger
 *  components:
 *    schemas:
 *      Recurrence:
 *        properties:
 *          name:
 *            type: string
 *          value:
 *            type: number
 *          period:
 *            type: object
 *            properties:
 *              kind:
 *                type: string
 *                enum: [monthly]
 *              value:
 *                anyOf:
 *                  - type: string
 *                  - type: number
 *        required:
 *          - name
 *          - value
 *          - period
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = function (app) {
  const modelName = 'recurrences';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    name: String,
    value: Number,
    period: {
      kind: String,
      value: Schema.Types.Mixed,
    },

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

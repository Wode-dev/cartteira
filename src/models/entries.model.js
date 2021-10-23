/**
 *  @swagger
 *  components:
 *    schemas:
 *      Entry:
 *        properties:
 *          value:
 *            description: Value of entry
 *            type: number
 *          title:
 *            description: Title of entry
 *            type: string
 *          description:
 *            description: Optional description of entry
 *            type: string
 *          tags:
 *            description: Tags for grouping entries
 *            type: array
 *            items:
 *              type: string
 *          date:
 *            description: When the entry took place
 *            type: string
 *            format: date
 *        required:
 *          - value
 *          - title
 *          - date
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = function (app) {
  const modelName = 'entries';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({

    value: Number,
    title: String,
    description: String,
    tags: [String],
    date: Date,

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

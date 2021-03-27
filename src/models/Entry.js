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

const mongoose = require("mongoose");
const { Schema } = mongoose;

let EntrySchema = new Schema(
  {
    value: Number,
    title: String,
    description: String,
    tags: [String],
    date: Date,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = EntrySchema;

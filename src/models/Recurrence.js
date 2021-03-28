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

const mongoose = require("mongoose");
const { Schema } = mongoose;

let RecurrenceSchema = new Schema(
  {
    name: String,
    value: Number,
    period: {
      kind: String,
      value: Schema.Types.Mixed,
    },
  },
  {
    collection: "recurrences",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Recurrence", RecurrenceSchema);

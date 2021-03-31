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

const mongoose = require("mongoose");
const { Schema } = mongoose;

const Recurrence = require("./Recurrence");

let UserDataSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    recurrences: [Recurrence.schema],
  },
  {
    collection: "userDatas",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("UserData", UserDataSchema);

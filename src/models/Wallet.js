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
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const Entry = require("./Entry");

let WalletSchema = new Schema(
  {
    name: String,
    type: String,
    entries: [Entry.schema],
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "wallets",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Wallet", WalletSchema);

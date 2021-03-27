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
 *        required:
 *          - name
 *          - type
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const EntrySchema = require("./Entry");

let WalletSchema = new Schema(
  {
    name: String,
    type: String,
    entries: [EntrySchema],
  },
  {
    collection: "wallets",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Wallet", WalletSchema);

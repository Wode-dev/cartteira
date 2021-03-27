const mongoose = require("mongoose");
const { Schema } = mongoose;

let RecurrenceSchema = new Schema(
  {
    name: String,
    value: Number,
    period: {
      type: String,
      value: Schema.types.Mixed,
    },
  },
  {
    collection: "wallets",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Recurrence", RecurrenceSchema);

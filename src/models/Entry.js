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

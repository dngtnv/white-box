import mongoose from "mongoose";

const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
  content: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now, expires: "1d" }
});

const ThoughtModel = mongoose.model("Thought", thoughtSchema);

export default ThoughtModel;

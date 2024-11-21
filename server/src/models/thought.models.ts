import mongoose from "mongoose";

const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
  content: { type: String, required: true, maxlength: 280 },
  timestamp: { type: Date, default: Date.now }
});

const ThoughtModel = mongoose.model("Thought", thoughtSchema);

export default ThoughtModel;

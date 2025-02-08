import mongoose from "mongoose";

const Schema = mongoose.Schema;

const styleSchema = new Schema(
  {
    background: { type: String, default: "#ffffff" }
  },
  { _id: false }
);

const thoughtSchema = new Schema({
  content: { type: String, required: true, maxlength: 280 },
  styles: { type: styleSchema },
  createdAt: { type: Date, default: Date.now }
});
// Create a TTL index on 'createdAt' that expires after 1 week
thoughtSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

const ThoughtModel = mongoose.model("Thought", thoughtSchema);

export default ThoughtModel;

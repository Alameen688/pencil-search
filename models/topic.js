const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: { type: String, required: true },
  name_lower: { type: String, required: true },
  path: { type: String },
});

TopicSchema.index({ name_lower: 1, path: 1 });

module.exports = mongoose.model('Topic', TopicSchema);

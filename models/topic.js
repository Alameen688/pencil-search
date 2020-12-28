const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String },
});

TopicSchema.index({ path: 1 });

module.exports = mongoose.model('Topic', TopicSchema);

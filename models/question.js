const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question_number: { type: Number, required: true },
  annotations: [{ type: mongoose.Types.ObjectId }],
});

QuestionSchema.index({ annotations: 1 });

module.exports = mongoose.model('Question', QuestionSchema);

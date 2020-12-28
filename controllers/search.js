const TopicModel = require('../models/topic');
const QuestionModel = require('../models/question');

exports.get = async (req, res, next) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Provide a query' });
  try {
    const topic = await TopicModel.findOne({ name: q });
    if (!topic) return res.json({ message: "Topic doesn't exist" });
    const expr = RegExp(`,${topic._id},`);
    const subTopics = await TopicModel.find({ path: expr });
    const possibleTopics = subTopics.map((s) => s['_id']);
    possibleTopics.push(topic._id);
    const result = await QuestionModel.find({
      annotations: { $in: possibleTopics },
    });
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred' });
  }
};

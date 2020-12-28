const mongoose = require('mongoose');
const XLSX = require('xlsx');
const dbConn = require('../db');
const TopicModel = require('../models/topic');
const QuestionModel = require('../models/question');

const ObjectId = mongoose.Types.ObjectId;

const mapTopicTree = (topics) => {
  const insertedTopics = {};
  const topicsRecord = [];
  for (const topic of topics) {
    let path = ',';

    for (const key in topic) {
      if (key.startsWith('__EMPTY')) break; // empty columns after topic level title

      const name = topic[key];
      const nameKey = name.toLowerCase();
      let topicId = insertedTopics[nameKey];

      if (!topicId) {
        topicId = new ObjectId();
        insertedTopics[nameKey] = topicId;
        topicsRecord.push({
          _id: topicId,
          name,
          name_lower: name.toLowerCase(), //extra field for performant case-insensitive query
          path: path === ',' ? null : path,
        });
      }
      path += `${topicId},`;
    }
  }
  return { insertedTopics, topicsRecord };
};

const mapQuestionToTopic = (insertedTopics, questions) => {
  const questionsRecord = [];

  for (const question of questions) {
    const record = { annotations: [] };
    for (const key in question) {
      if (key.startsWith('__EMPTY')) break;
      if (key.toLowerCase() === 'question number') {
        record.no = question[key];
        continue;
      }
      const annotation = question[key];
      const annotationKey = annotation.toLowerCase();
      record.annotations.push(insertedTopics[annotationKey]);
    }
    if (record.annotations.length) questionsRecord.push(record);
  }
  return { questionsRecord };
};

//TODO: batch insert of 1,000 if topics array for better insertMany
const saveTopicsToDb = async (topics) => TopicModel.insertMany(topics);
const saveQuestionsToDb = async (questions) =>
  QuestionModel.insertMany(questions);

const importSheetToDb = async () => {
  const workbook = XLSX.readFile('data/Questions_and_Topics.xlsx');

  const topics = XLSX.utils.sheet_to_json(workbook.Sheets.Topics);
  const { insertedTopics, topicsRecord } = mapTopicTree(topics);

  const questions = XLSX.utils.sheet_to_json(workbook.Sheets.Questions);
  const { questionsRecord } = mapQuestionToTopic(insertedTopics, questions);

  await Promise.all([
    saveTopicsToDb(topicsRecord),
    saveQuestionsToDb(questionsRecord),
  ]);
};

importSheetToDb()
  .then(() => {
    console.log('Successfully imported data');
    process.exit(0);
  })
  .catch((err) => {
    console.error(`An error occured ${err.message}`);
    process.exit(1);
  });

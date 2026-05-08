// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//   task: String,
//   assignee: String,
//   deadline: String,
//   done: { type: Boolean, default: false }
// });

// const MeetingSchema = new mongoose.Schema({
//   title: { type: String, default: 'Untitled Meeting' },
//   audioFile: String,
//   transcript: String,
//   summary: String,
//   decisions: [String],
//   tasks: [TaskSchema],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Meeting', MeetingSchema);

// -------------------------------------------------------------
// DAY-2


// const mongoose = require('mongoose');

// const TaskSchema = new mongoose.Schema({
//   task: String,
//   assignee: String,
//   deadline: String,
//   done: { type: Boolean, default: false }
// });

// const MeetingSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     default: null
//   },
//   title: { type: String, default: 'Untitled Meeting' },
//   audioFile: String,
//   transcript: String,
//   summary: String,
//   decisions: [String],
//   tasks: [TaskSchema],
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Meeting', MeetingSchema);

// -------------------------------------------------------------------------


const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: String,
  assignee: String,
  deadline: String,
  done: { type: Boolean, default: false }
});

const CalendarEventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  duration: Number,
  description: String,
  type: { type: String, enum: ['meeting', 'deadline', 'followup', 'review'], default: 'meeting' }
});

const MeetingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  title: { type: String, default: 'Untitled Meeting' },
  audioFile: String,
  transcript: String,
  summary: String,
  decisions: [String],
  tasks: [TaskSchema],
  calendarEvents: [CalendarEventSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meeting', MeetingSchema);

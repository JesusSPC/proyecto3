const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  bio: String,
  hoursObj: { type: Number, default: 0 },
  minutesObj: { type: Number, default: 0 },
  timeLapsed: { type: String, default: '0' },
  overTime: { type: String, default: '0' },
  stars:{ type: Number, default: 0 },
  frequency: {type: String, enum: ["Day", "Week", "Month"]},
  hours: { type: Number, default: 0 },
  minutes: { type: Number, default: 0 },
  seconds: { type: Number, default: 0 },
  millis: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
  creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
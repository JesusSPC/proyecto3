const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  name: String,
  bio: String,
  time: Number,
  timeLapsed: {type: String, default: '0'},
  frequency: {enum: ["Day", "Week", "Month"]},
  minutes: { type: Number, default: 0 },
  seconds: { type: Number, default: 0 },
  millis: { type: Number, default: 0 },
  active: {type: Boolean, default: false},
  finished: {type: Boolean, default: false},
  creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
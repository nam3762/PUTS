const mongoose = require("mongoose");

const ClassroomSchema = new mongoose.Schema({
  building: { type: String, required: true },
  classroom_no: { type: String, required: true }
});

const ScheduleItemSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  period: { type: Number, required: true },
  duration: { type: Number, required: true },
  code: { type: String, required: true },
  lecture: { type: String, required: true },
  division: { type: Number, required: true },
  professor: { type: String, required: true },
  classroom: { type: ClassroomSchema, required: true },
  year: { type: Number, required: true }
});

const OutputSchema = new mongoose.Schema({
  output_input_no: { type: Number, required: true, unique: true },
  schedule: { type: [ScheduleItemSchema], required: true }
});

module.exports = mongoose.model("OutputSchema", OutputSchema);

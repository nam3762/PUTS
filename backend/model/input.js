const mongoose = require("mongoose");

const OfftimeSchema = new mongoose.Schema({
  day: { type: String, required: true },
  period: { type: Number, required: true }
});

const HopetimeSchema = new mongoose.Schema({
  day: { type: String, required: true },
  period: { type: Number, required: true }
});

const ProfessorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  is_professor: { type: Boolean, required: true, default: true },
  offtime: { type: [OfftimeSchema], required: true },
  hopetime: { type: [HopetimeSchema], required: true }
});

const ClassroomSchema = new mongoose.Schema({
  building: { type: String, required: true },
  classroom_no: { type: String, required: true },
  capacity: { type: Number, required: true },
  group: { type: String, required: true }
});

const LectureSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  division: { type: Number, required: true },
  section: { type: Number, required: true },
  major_required: { type: Boolean, required: true },
  group: { type: String, required: true },
  duration: { type: Number, required: true },
  capacity: { type: Number, required: true },
  year: { type: Number, required: true }
});

const InputSchema = new mongoose.Schema({
  input_no: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  introduce: { type: String, required: true },
  date: { type: Date, required: true },
  professor: { type: [ProfessorSchema], required: true },
  classroom: { type: [ClassroomSchema], required: true },
  lecture: { type: [LectureSchema], required: true }
});

module.exports = mongoose.model("InputSchema", InputSchema);

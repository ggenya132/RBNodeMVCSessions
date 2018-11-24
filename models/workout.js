const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  exercises: [
    {
      title: {
        type: String,
        required: true
      },
      load: {
        type: String,
        default: "0"
      },
      performedReps: [{ type: Number }],
      _id: false
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("workouts", WorkoutSchema);
module.exports = User;
//sample data
[
  { title: "db curl", load: "95", performedReps: [8, 8, 8] },
  { title: "bb squat", load: "225", performedReps: [10, 10, 12] }
];

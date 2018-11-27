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

      sets: [
        {
          performedReps: { type: Number },
          load: {
            type: Number,
            default: 0
          }
        }
      ],
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
  {
    title: "db curl",
    sets: [
      { performedReps: 8, load: 185 },
      { performedReps: 8, load: 185 },
      { performedReps: 8, load: 185 },
      { performedReps: 8, load: 185 }
    ]
  },
  {
    title: "bb squat",
    sets: [
      { performedReps: 8, load: 225 },
      { performedReps: 8, load: 235 },
      { performedReps: 12, load: 185 }
    ]
  },
  {
    title: "db press",
    sets: [
      { performedReps: 10, load: 50 },
      { performedReps: 10, load: 50 },
      { performedReps: 10, load: 50 }
    ]
  }
];

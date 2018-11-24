const Workout = require("../models/workout");
const {
  getStartAndEndOfTheWeek,
  getPreviousweekWorkoutsAsArray
} = require("../utils/utils");
const createWorkout = (req, res, next) => {
  let { _id: user } = req.session.user;
  let { exercises } = req.body;
  exercises = JSON.parse(exercises);
  let newWorkout = new Workout({ user, exercises });

  console.log({ newWorkout, exercises, user });
  newWorkout
    .save()
    .then(newWorkout => {
      res.json(newWorkout);
    })
    .catch(err => {
      res.json(err);
    });
};
const updateWorkout = (req, res, next) => {};

const getWeeklyWorkouts = async (req, res, next) => {
  const arr = await getPreviousweekWorkoutsAsArray(req);
  console.log(arr);
  res.json(arr);
};
module.exports = {
  createWorkout,
  updateWorkout,
  getWeeklyWorkouts,
  getPreviousweekWorkoutsAsArray
};

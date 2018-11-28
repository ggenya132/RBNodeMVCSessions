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

//implement me you fool
const updateWorkout = (req, res, next) => {};

const getWeeklyWorkouts = async (req, res, next) => {
  const arr = await getPreviousweekWorkoutsAsArray(req);
  console.log(arr);
  res.json(arr);
};

const getWorkoutByDate = async (req, res, next) => {
  let { _id: user } = req.session.user;
  let { date } = req.params;

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  console.log({ date });

  const workouts = await Workout.find(
    //query today up to tonight
    { date: { $gte: start, $lt: end }, user }
  );

  workouts.length === 0
    ? res.json({ errors: ["no workouts found for this date"] })
    : res.json(workouts);
};
module.exports = {
  createWorkout,
  updateWorkout,
  getWeeklyWorkouts,
  getPreviousweekWorkoutsAsArray,
  getWorkoutByDate
};

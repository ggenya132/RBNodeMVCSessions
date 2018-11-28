let workoutController = require("../controllers/workout");

const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(req.session.user);
  res.json({ workout: "works" });
});

router.get("/:date", workoutController.getWorkoutByDate);
router.post("/", workoutController.createWorkout);
router.get("/weekly", workoutController.getWeeklyWorkouts);
module.exports = router;

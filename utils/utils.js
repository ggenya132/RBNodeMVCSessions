const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const Workout = require("../models/workout");
const xl = require("excel4node");

var fs = require("fs");

const { nodemailerOptions } = require("../config/keys");

const getStartAndEndOfTheWeek = d => {
  function getSunday(d) {
    d = new Date(d);
    if (d.getDay() === 0) {
      return d;
    } else {
      diff = d.getDate() + (7 - d.getDay());
      return new Date(d.setDate(diff));
    }
  }

  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    let monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0);
    return monday;
  } //   var curr = new Date(); // get current date
  //   var first = curr.getDate() - (curr.getDay() + 1); // First day is the day of the month - the day of the week
  //   var last = first + 6; // last day is the first day + 6

  //   var firstday = new Date(curr.setDate(first));
  //   var lastday = new Date(curr.setDate(last));
  let firstday = getMonday(d);
  let lastday = getSunday(d);

  return { firstday, lastday };
};

const getPreviousweekWorkoutsAsArray = req => {
  const { firstday, lastday } = getStartAndEndOfTheWeek(new Date());

  console.log({ firstday, lastday });
  return Workout.find({
    user: req.session.user._id,
    date: { $gte: firstday, $lte: lastday }
  });
};
const getNodeMailerClient = () => {
  return nodemailer.createTransport(sgTransport(nodemailerOptions));
};
const writeExcelFile = (worksouts, req) => {
  return new Promise((resolve, reject) => {
    //TODO implement mapping of exercises array to workbook
    //THIS IS JUST SOME SAMPLE CODE
    var wb = new xl.Workbook();

    // Add Worksheets to the workbook
    var ws = wb.addWorksheet("Sheet 1");
    var ws2 = wb.addWorksheet("Sheet 2");

    // Create a reusable style
    var style = wb.createStyle({
      font: {
        color: "#FF0800",
        size: 12
      },
      numberFormat: "$#,##0.00; ($#,##0.00); -"
    });

    let lastLoadPerformed = 0;

    let allSetsHaveSameLoadAndReps = exercise =>
      exercise.sets.every(
        (val, i, arr) =>
          val.load === arr[0].load && val.repPerformed === arr[0].repPerformed
      );

    //sort ensures order of reps performed is indeterminable
    let mapExercisesForExcelWriter = exercises => {
      return exercises.map((exercise, index) => {
        if (allSetsHaveSameLoadAndReps(exercise)) {
          return {
            title: exercise.title,
            entry: `${exercise.sets[0].load} * ${
              exercise.sets[0].performedReps
            } * ${exercise.sets.length}`
          };
        } else {
          exercise.sets.sort((s1, s2) => s1.load - s2.load);
          let mappedString = "";
          let previousLoad = exercise.sets[0].load;
          let previousReps = exercise.sets[0].performedReps;
          let numberOfConsecutiveSets = 1;
          exercise.sets.forEach((currentSet, index) => {
            if (
              currentSet.load === previousLoad &&
              previousReps === currentSet.repPerformed
            ) {
              mappedString = `${previousLoad} * ${previousReps} * ${numberOfConsecutiveSets}`;
              numberOfConsecutiveSets = numberOfConsecutiveSets + 1;
            } else {
              numberOfConsecutiveSets = 1;
              previousLoad = currentSet.load;
              previousReps = currentSet.performedReps;
              mappedString += `, ${previousLoad} * ${previousReps} * ${numberOfConsecutiveSets}`;
            }
          });
          return {
            title: exercise.title,
            entry: mappedString
          };
        }
      });
    };

    let mappedWorkouts = worksouts.map(workout => {
      return mapExercisesForExcelWriter(workout.exercises);
    });

    writeExercises = (mappedExercises, startingindex) => {
      mappedExercises.forEach((mappedExercise, index) => {
        ws.cell(1, startingindex + index + 1).string(mappedExercise.title);
        ws.cell(2, startingindex + index + 1).string(mappedExercise.entry);
      });
    };

    let initialIndex = 0;
    writeExercises(mappedWorkouts[0]);
    mappedWorkouts.forEach(mappedWorkxout => {
      writeExercises(mappedWorkout, initialIndex);
      initialIndex += mappedWorkout.length;
    });

    let userId = req.session.user._id;
    console.log({ userId });
    wb.write(`${userId}.xlsx`, (err, stats) => {
      console.log({ err, stats });

      console.log({ err, stats });

      err ? reject(err) : resolve({ test: "value" });
    });
  });
};
module.exports = {
  getStartAndEndOfTheWeek,
  getNodeMailerClient,
  writeExcelFile,
  getPreviousweekWorkoutsAsArray
};

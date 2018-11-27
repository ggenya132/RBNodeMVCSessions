const xl = require("excel4node");

const writeExcelFile = worksouts => {
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

    wb.write("ExcelTest.xlsx");
  };

  let initialIndex = 0;
  writeExercises(mappedWorkouts[0]);
  mappedWorkouts.forEach(mappedWorkout => {
    writeExercises(mappedWorkout, initialIndex);
    initialIndex += mappedWorkout.length;
  });
};
let sampleWorkouts = [
  {
    _id: "5bfc8003bf111dac425cfc66",
    user: "5bfc7e5dbf111dac425cfc65",
    exercises: [
      {
        sets: [
          {
            load: 185,
            _id: "5bfc8003bf111dac425cfc70",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8003bf111dac425cfc6f",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8003bf111dac425cfc6e",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8003bf111dac425cfc6d",
            performedReps: 8
          }
        ],
        title: "db curl"
      },
      {
        sets: [
          {
            load: 225,
            _id: "5bfc8003bf111dac425cfc6c",
            performedReps: 8
          },
          {
            load: 235,
            _id: "5bfc8003bf111dac425cfc6b",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8003bf111dac425cfc6a",
            performedReps: 12
          }
        ],
        title: "bb squat"
      },
      {
        sets: [
          {
            load: 50,
            _id: "5bfc8003bf111dac425cfc69",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8003bf111dac425cfc68",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8003bf111dac425cfc67",
            performedReps: 10
          }
        ],
        title: "db press"
      }
    ],
    date: "2018-11-26T23:21:39.020Z",
    __v: 0
  },
  {
    _id: "5bfc8023bf111dac425cfc71",
    user: "5bfc7e5dbf111dac425cfc65",
    exercises: [
      {
        sets: [
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc7b",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc7a",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc79",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc78",
            performedReps: 8
          }
        ],
        title: "db curl"
      },
      {
        sets: [
          {
            load: 225,
            _id: "5bfc8023bf111dac425cfc77",
            performedReps: 8
          },
          {
            load: 235,
            _id: "5bfc8023bf111dac425cfc76",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc75",
            performedReps: 12
          }
        ],
        title: "bb squat"
      },
      {
        sets: [
          {
            load: 50,
            _id: "5bfc8023bf111dac425cfc74",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8023bf111dac425cfc73",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8023bf111dac425cfc72",
            performedReps: 10
          }
        ],
        title: "db press"
      }
    ],
    date: "2018-11-26T23:22:11.028Z",
    __v: 0
  },
  {
    _id: "5bfc8023bf111dac425cfc7c",
    user: "5bfc7e5dbf111dac425cfc65",
    exercises: [
      {
        sets: [
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc86",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc85",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc84",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc83",
            performedReps: 8
          }
        ],
        title: "db curl"
      },
      {
        sets: [
          {
            load: 225,
            _id: "5bfc8023bf111dac425cfc82",
            performedReps: 8
          },
          {
            load: 235,
            _id: "5bfc8023bf111dac425cfc81",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8023bf111dac425cfc80",
            performedReps: 12
          }
        ],
        title: "bb squat"
      },
      {
        sets: [
          {
            load: 50,
            _id: "5bfc8023bf111dac425cfc7f",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8023bf111dac425cfc7e",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8023bf111dac425cfc7d",
            performedReps: 10
          }
        ],
        title: "db press"
      }
    ],
    date: "2018-11-26T23:22:11.952Z",
    __v: 0
  },
  {
    _id: "5bfc8024bf111dac425cfc87",
    user: "5bfc7e5dbf111dac425cfc65",
    exercises: [
      {
        sets: [
          {
            load: 185,
            _id: "5bfc8024bf111dac425cfc91",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8024bf111dac425cfc90",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8024bf111dac425cfc8f",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8024bf111dac425cfc8e",
            performedReps: 8
          }
        ],
        title: "db curl"
      },
      {
        sets: [
          {
            load: 225,
            _id: "5bfc8024bf111dac425cfc8d",
            performedReps: 8
          },
          {
            load: 235,
            _id: "5bfc8024bf111dac425cfc8c",
            performedReps: 8
          },
          {
            load: 185,
            _id: "5bfc8024bf111dac425cfc8b",
            performedReps: 12
          }
        ],
        title: "bb squat"
      },
      {
        sets: [
          {
            load: 50,
            _id: "5bfc8024bf111dac425cfc8a",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8024bf111dac425cfc89",
            performedReps: 10
          },
          {
            load: 50,
            _id: "5bfc8024bf111dac425cfc88",
            performedReps: 10
          }
        ],
        title: "db press"
      }
    ],
    date: "2018-11-26T23:22:12.929Z",
    __v: 0
  }
];

writeExcelFile(sampleWorkouts);

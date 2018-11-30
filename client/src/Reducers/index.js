import {
  REP_CHANGE,
  LOAD_CHANGE,
  EXERCISE_CHANGE,
  SET_CHANGE,
  WORKOUT_CHANGE,
  GET_DATA,
  FETCH_DATA,
  MODAL_SHOW,
  MODAL_DISMISS,
  FETCH_MODAL_DATA
} from "../Actions/actions";

const initialState = {
  userIsAuthenticated: false,
  showModal: false,
  isLoading: true,
  modal: {
    isLoading: false,
    activePreviousWorkout: {}
  },
  workouts: [
    {
      title: "A",
      exercises: [
        {
          title: "BB Back Squat",
          suggestedReps: "7-9",
          suggestedSets: "4",
          load: "",
          rpe: "6-7",
          performedReps: [0, 0, 0, 0]
        },
        {
          title: "BB RDL",
          suggestedReps: "4-6",
          suggestedSets: "3",
          load: "",
          rpe: "8-9",
          performedReps: [0, 0, 0]
        },
        {
          title: "1-leg Leg Extensions",
          suggestedReps: "10-12",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "1-leg Leg Curls",
          suggestedReps: "8-12",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "Cable Bicep Curls",
          suggestedReps: "10-12",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "Cable Press Downs",
          suggestedReps: "10-12",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        }
      ]
    },
    {
      title: "B",
      exercises: [
        {
          title: "Chin-ups",
          suggestedReps: "7-9",
          suggestedSets: "3",
          load: "",
          rpe: "6-7",
          performedReps: [0, 0, 0]
        },
        {
          title: "Landmine Presses",
          suggestedReps: "7-9",
          suggestedSets: "3",
          load: "",
          rpe: "6-7",
          performedReps: [0, 0, 0]
        },
        {
          title: "BB Bench Press",
          suggestedReps: "7-9",
          suggestedSets: "4",
          load: "",
          rpe: "6-7",
          performedReps: [0, 0, 0, 0]
        },
        {
          title: "Seated Cable Rows",
          suggestedReps: "7-9",
          suggestedSets: "4",
          load: "",
          rpe: "6-7",
          performedReps: [0, 0, 0, 0]
        },
        {
          title: "Reverse Crunch w/ Deadbug",
          suggestedReps: "10",
          suggestedSets: "3",
          load: "",
          rpe: "NO RPE",
          performedReps: [0, 0, 0]
        },
        {
          title: "Side Plank",
          suggestedReps: "40 seconds",
          suggestedSets: "3",
          load: "",
          rpe: "NO RPE",
          performedReps: [0, 0, 0]
        }
      ]
    },
    {
      title: "C",
      exercises: [
        {
          title: "BB Hip Thrusts",
          suggestedReps: "10-12",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "BB Front Squat",
          suggestedReps: "6-8",
          suggestedSets: "3",
          load: "",
          rpe: "8-9",
          performedReps: [0, 0, 0]
        },
        {
          title: "1 Leg Reverse Lunges",
          suggestedReps: "8-10",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "Weighted Back Extension",
          suggestedReps: "8-10",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "DB Bicep Curls",
          suggestedReps: "10-12",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "DB Tricep Extensions",
          suggestedReps: "10-12",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        }
      ]
    },
    {
      title: "D",
      exercises: [
        {
          title: "1-arm Alternating DB Press",
          suggestedReps: "8-10",
          suggestedSets: "4",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0, 0]
        },
        {
          title: "DB Rows",
          suggestedReps: "8-10",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "OHP",
          suggestedReps: "5",
          suggestedSets: "3",
          load: "",
          rpe: "8-9",
          performedReps: [0, 0, 0]
        },
        {
          title: "Pull-ups",
          suggestedReps: "7-9",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "Band Pull Aparts",
          suggestedReps: "12-15",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        },
        {
          title: "Cable Flys",
          suggestedReps: "12-15",
          suggestedSets: "3",
          load: "",
          rpe: "7-8",
          performedReps: [0, 0, 0]
        }
      ]
    }
  ],
  currentWorkoutInformation: {
    currentActiveWorkout: 0,
    currentActiveExercise: 0,
    currentActiveSet: 0
  }
};
export const RippedBodyReducer = (state = initialState, action) => {
  let {
    currentWorkoutInformation: {
      currentActiveExercise,
      currentActiveWorkout,
      currentActiveSet
    }
  } = state;
  let newState = { ...state };
  switch (action.type) {
    case FETCH_DATA:
      newState.isLoading = !newState.isLoading;
      return newState;
    case REP_CHANGE:
      console.log(action.newSetValue);
      newState.workouts[currentActiveWorkout].exercises[
        currentActiveExercise
      ].performedReps = newState.workouts[currentActiveWorkout].exercises[
        currentActiveExercise
      ].performedReps.map((setValue, index) => {
        if (index == currentActiveSet) {
          return action.newSetValue;
        }
        return setValue;
      });

      console.log(newState);
      return newState;

    case LOAD_CHANGE:
      newState = { ...state };
      newState.workouts[currentActiveWorkout].exercises[
        currentActiveExercise
      ].load = action.newLoadValue;
      console.log(
        "CURRENT ACTIVE WORKOUT LOAD CHANGE",
        newState.workouts[currentActiveWorkout].exercises[currentActiveExercise]
          .load
      );
      return newState;
    case WORKOUT_CHANGE:
      console.log("WORKOUT CHNAGE", action.newCurrentActiveWorkout);

      newState.currentWorkoutInformation.currentActiveWorkout =
        action.newCurrentActiveWorkout;
      console.log(newState);
      return newState;
    case SET_CHANGE:
      console.log("SET CHANGE", action.newCurrentActiveSet);
      newState.currentWorkoutInformation.currentActiveSet =
        action.newCurrentActiveSet;
      return newState;
    case EXERCISE_CHANGE:
      console.log("exercise CHNAGE", action.newCurrentActiveExercise);

      newState.currentWorkoutInformation.currentActiveExercise =
        action.newCurrentActiveExercise;
      return newState;
    case GET_DATA:
      // console.log(action);
      console.log("ACTIONS PAYLOAD", action);
      newState.isLoading = false;
      const newWorkouts = state.workouts.map((workout, index) => {
        return action.newWorkouts.find(
          returnedWorkout => returnedWorkout.title == workout.title
        )
          ? action.newWorkouts.find(
              returnedWorkout => returnedWorkout.title == workout.title
            )
          : workout;
      });
      newState.workouts = newWorkouts;
      console.log("FETCHED STATE", newState);
      return newState;
    case MODAL_SHOW:
      return { ...newState, showModal: true };
    case MODAL_DISMISS:
      return { ...newState, showModal: false };
    case FETCH_MODAL_DATA:
      const modal = { ...newState.modal, isLoading: true };
      return { ...newState, modal };
    default:
      return state;
  }
};

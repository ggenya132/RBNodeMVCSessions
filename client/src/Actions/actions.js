export const REP_CHANGE = "REP_CHANGE";
export const LOAD_CHANGE = "LOAD_CHANGE";
export const WORKOUT_CHANGE = "WORKOUT_CHANGE";
export const SET_CHANGE = "SET_CHANGE";
export const EXERCISE_CHANGE = "EXERCISE_CHANGE";
export const FETCH_DATA = "FETCH_DATA";
export const GET_DATA = "GET_DATA";
export const MODAL_SHOW = "MODAL_SHOW";
export const MODAL_DISMISS = "MODAL_DISMISS";
export const GET_MODAL_DATA = "GET_MODAL_DATA";
export const FETCH_MODAL_DATA = "FETCH_MODAL_DATA";
export const fetchPreviousData = uri => {
  return dispatch => {
    dispatch({ type: FETCH_MODAL_DATA });
    dispatch({ type: MODAL_SHOW });
    fetch(uri)
      .then(res => res.json())
      .then(data => {
        dispatch({ type: GET_MODAL_DATA, newPreviousWorkout: data });
      });
  };
};

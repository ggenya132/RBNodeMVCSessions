import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { MODAL_DISMISS } from "../Actions/actions";
import ModalLoaderComponent from "./ModalLoaderComponent";
import PastExerciseInfo from "./PastExerciseInfo";
class PastWorkoutModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: true,
      pastWorkout: null
    };
  }

  getUri() {
    const workoutMap = ["A", "B", "C", "D"];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    let day, month;
    day = oneWeekAgo.getDate();
    month = oneWeekAgo.getMonth();
    const workoutId = workoutMap[this.props.currentActiveWorkout];
    console.log(`workout/${workoutId}/${day}-${month}`);
  }
  componentDidMount() {
    var myHeaders = new Headers();
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("cache-control", "no-cache");

    var myInit = {
      method: "GET",
      headers: myHeaders
    };
    const uri = "workout/A/9-8";
    // fetch(uri, myInit)
    //   .then(res => res.json())
    //   .then(pastWorkout => {
    //     console.log("fetch payload from modal", pastWorkout);
    //     this.setState(prevSate => ({ ...prevSate, pastWorkout }));
    //     // const parsedTabs = JSON.parse(JSON.stringify(newWorkouts));
    //     // console.log("var parsed tabs", parsedTabs);
    //   });

    console.log("MODAL PROPS", this.props.modal);
  }

  handleHide() {
    this.props.dispatch({ type: MODAL_DISMISS });
  }

  componentDidUpdate() {
    this.getUri();
    console.log(this.props);
    console.log("MODAL UPDATING");
  }
  render() {
    const loaderContent = <PastWorkoutModal />;
    const nonLoaderContent = (
      <div>
        <Modal.Header onHide={this.handleHide} closeButton>
          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Wrapped Text</h4>
          {this.state.pastWorkout &&
            this.state.pastWorkout.exercises.map(exercise => {
              return <PastExerciseInfo exercise={exercise} />;
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleHide}>Close</Button>
        </Modal.Footer>
      </div>
    );
    // const contentToRender = this.props.modal.isLoading;
    console.log("MODAL CONTENT!!", this.props)
      ? loaderContent
      : nonLoaderContent;
    return (
      <div className="">
        <Modal
          {...this.props}
          onClick={this.handleHide}
          show={this.props.showmodal}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
        >
          {this.props.modal.isLoading ? loaderContent : nonLoaderContent}
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({
  modal,
  showModal,
  currentWorkoutInformation: { currentActiveWorkout, currentActiveExercise }
}) => ({
  showmodal: showModal,
  currentActiveWorkout,
  currentActiveExercise,
  modal
});
export default connect(mapStateToProps)(PastWorkoutModal);

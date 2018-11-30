import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Tabs,
  Tab,
  NavDropdown,
  MenuItem,
  Col,
  Row
} from "react-bootstrap";
import {
  WORKOUT_CHANGE,
  GET_DATA,
  FETCH_DATA,
  MODAL_SHOW,
  fetchPreviousData
} from "../Actions/actions";
import Workout from "./Workout";
import { connect } from "react-redux";
import Loader from "./LoadingComponent";

class TabsNav extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("COMPONENT MOUNTING ");
    var myHeaders = new Headers();
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("cache-control", "no-cache");

    var myInit = {
      method: "GET",
      headers: myHeaders
    };
    const uri = "workout";
    this.props.dispatch({ type: FETCH_DATA });
    fetch("workout", myInit)
      .then(res => res.json())
      .then(newWorkouts => {
        console.log("what", newWorkouts);
        console.log("fetch payload", newWorkouts);
        // const parsedTabs = JSON.parse(JSON.stringify(newWorkouts));
        // console.log("var parsed tabs", parsedTabs);
        newWorkouts.testProp = "TEST";
        this.props.dispatch({
          type: GET_DATA,
          newWorkouts
        });
      });
  }

  onSelect = key => {
    console.log("hi");
    this.props.dispatch({ type: WORKOUT_CHANGE, newCurrentActiveWorkout: key });
  };

  getUri() {
    const workoutMap = ["A", "B", "C", "D"];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    let day, month;
    day = oneWeekAgo.getDate();
    month = oneWeekAgo.getMonth();
    const workoutId = workoutMap[this.props.currentActiveWorkout];
    return `workout/${workoutId}/${day}-${month}`;
  }

  onShowModal = () => {
    // this.props.dispatch({ type: MODAL_SHOW });

    this.props.dispatch(fetchPreviousData(this.getUri()));
  };

  componentDidUpdate() {
    console.log("TABS UPDATING");
  }

  render() {
    return (
      <div className="tabs-container">
        {this.props.isLoading && <Loader />}
        {/* <Tabs
          onSelect={this.onSelect}
          defaultActiveKey={0}
          id="uncontrolled-tab-example"
        >
          {this.props.workouts.map((currentWorkout, index) => {
            return (
              <Tab
                key={index}
                eventKey={index}
                title={currentWorkout.title.toUpperCase()}
              >
                <Workout
                  index={index}
                  dispatch={this.props.dispatch}
                  selectedWorkout={currentWorkout}
                />
              </Tab>
            );
          })}
        </Tabs> */}

        <Tab.Container
          id="tabs-with-dropdown"
          defaultActiveKey={0}
          onSelect={this.onSelect}
        >
          <Row className="clearfix noMargin">
            <Col className="noPadding" sm={12}>
              <Nav bsStyle="tabs">
                {this.props.workouts.map((currentWorkout, index) => {
                  return (
                    <NavItem key={index} eventKey={index}>
                      {currentWorkout.title.toUpperCase()}{" "}
                    </NavItem>
                  );
                })}

                <NavDropdown
                  eventKey="3"
                  title="&hellip;"
                  id="nav-dropdown-within-tab"
                >
                  <MenuItem
                    onClick={this.onShowModal}
                    eventKey={this.props.currentActiveWorkout}
                  >
                    Show Modal
                  </MenuItem>
                  <MenuItem eventKey="3.2">Another action</MenuItem>
                  <MenuItem eventKey="3.3">Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="3.4">Separated link</MenuItem>
                </NavDropdown>
              </Nav>
            </Col>
            <Col className="noPadding" sm={12}>
              <Tab.Content animation>
                {this.props.workouts.map((currentWorkout, index) => {
                  return (
                    <Tab.Pane
                      key={index}
                      eventKey={index}
                      title={currentWorkout.title.toUpperCase()}
                    >
                      <Workout
                        index={index}
                        dispatch={this.props.dispatch}
                        selectedWorkout={currentWorkout}
                      />
                    </Tab.Pane>
                  );
                })}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}
const mapStateToProps = ({
  workouts,
  currentWorkoutInformation,
  currentWorkoutInformation: { currentActiveWorkout },
  isLoading
}) => {
  console.log(currentWorkoutInformation);
  return {
    isLoading,
    workouts,
    currentWorkoutInformation,
    currentActiveWorkout
  };
};
export default connect(mapStateToProps)(TabsNav);

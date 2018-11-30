import React, { Component } from "react";

let lastScrollY = 0;
let percentageScrolled = 0;
export default class Landing extends Component {
  handleScroll = e => {
    lastScrollY = window.scrollY;

    percentageScrolled = lastScrollY / 800;
    this.setState({ percentageScrolled });
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <div className="landing  title-container">
        <div
          className="landing__image-container"
          // style={{
          //   transform: `scale(${
          //     1.5 * percentageScrolled > 0.65 ? percentageScrolled : 0.65
          //   }`
          // }}
        />
        <h1>RIPPED BODY APP</h1>

        <div
          className="dark-overlay"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${percentageScrolled + 0.25})`
          }}
        />
      </div>
    );
  }
}

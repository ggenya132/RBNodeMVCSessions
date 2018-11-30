import React, { Component } from "react";

export default class LoadingComponent extends Component {
  render() {
    return (
      <div class="loading-spinner__container">
        <div class="loading-spinner__box">
          <div class="loader" />
        </div>
      </div>
    );
  }
}

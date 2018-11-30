import React, { Component } from "react";

export default class ModalLoaderComponent extends Component {
  render() {
    return (
      <div className="lds-ellipsis modal-loader">
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}

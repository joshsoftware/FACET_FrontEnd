import React, { Component } from "react";
import PropTypes from "prop-types";
import JSONEditor from "jsoneditor";

import "jsoneditor/dist/jsoneditor.css";

import "./style.css";

export default class Editor extends Component {
  componentDidMount() {
    // copy all properties into options for the editor
    // (except the properties for the JSONEditorReact component itself)
    const options = Object.assign({}, this.props);
    delete options.json;
    delete options.text;

    this.jsoneditor = new JSONEditor(this.container, options);

    if ("json" in this.props) {
      this.jsoneditor.set(this.props.json);
    }
    if ("text" in this.props) {
      this.jsoneditor.setText(this.props.text);
    }
  }

  componentDidUpdate() {
    if ("json" in this.props) {
      this.jsoneditor.update(this.props.json);
    }

    if ("text" in this.props) {
      this.jsoneditor.updateText(this.props.text);
    }

    if ("mode" in this.props) {
      this.jsoneditor.setMode(this.props.mode);
    }
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  render() {
    return (
      <div
        className="jsoneditor-react-container"
        ref={(elem) => (this.container = elem)}
      />
    );
  }
}

Editor.propTypes = {
  text: PropTypes.string,
  json: PropTypes.object,
  mode: PropTypes.oneOf(["code", "tree"]),
  onChangeText: PropTypes.func,
};

import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Button, Col, Row, Form, FormGroup, Label, Input } from "reactstrap";
import EmailMenus from "./EmailMenus";
import { RouteComponentProps } from "react-router";
import Select from "react-select";
import { languageTranslation } from "../../../helpers";

class Emails extends Component<RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  options = [
    { value: "Denis", label: "Aaron, Hank" },
    { value: "Denis", label: "Bergman, Ingmar" },
    { value: "Beck, Glenn", label: "Berle, Milton" }
  ];
  onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="email-section">
        emails Main
      </div>
    );
  }
}
export default Emails;

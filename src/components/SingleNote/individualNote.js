import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import ModalExample from "./modal";

const SingleNoteContainer = styled.div`
width: 100%;
  min-height: 100vh;
  background-color: #373940;
  height: 100%;
`;

const EditDeleteDiv = styled.div`
  margin-top: 20px;
  margin-left: 65%;
`;

const EditDeleteButton = styled.h4`
color: #ffffff;
padding-top: 15px
text-decoration-line: underline;
display: inline;
margin: 0 7%;
&:hover {
  cursor: pointer;
}
`;

const SingleNoteDiv = styled.div`
  height: auto;
  width: 90%;
  margin: 0 auto;
  background-color: white;
  border-radius: 5px;
`;
const NoteTitle = styled.h2`
 padding-top:10px;
 margin-left: 1%;
 margin-right: 1%;
  border-bottom: 1px solid #d0d0d0;
  margin-top: 30px;
  background-color: #ffffff;
  color: black;
  border-radius: 5px;
  padding-left: 5px;
  border-bottom: ;
`;

const NoteText = styled.p`
  margin-left: 1%;
  padding-bottom: 10px;
  background-color: #ffffff;
  color: black;
  border-radius: 5px;
  padding-left: 5px;
`;

class IndividualNote extends Component {
  state = {
    title: "",
    contents: "",
    id: "",
    modal: false,
    backdrop: true
  };

  componentDidMount() {
    const noteID = this.props.match.params.id;

    this.setState({ id: noteID });
    this.getNote(noteID);
  }

  getNote = noteID => {
    axios
      .get(`https://backendprojectserver.herokuapp.com/notes/${noteID}`)
      .then(response => {
        console.log(response);
        this.setState({
          title: response.data[0].title,
          contents: response.data[0].contents,
          id: response.data[0].id
        });
        console.log(this.state.id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  cloneNote = () => {
    const clonedNote = {
      title: this.state.title,
      contents: this.state.contents
    };

    axios
      .post("https://backendprojectserver.herokuapp.com/notes", clonedNote)
      .then(response => {
        console.log(response);
        this.setState = { title: "", contents: "", id: "" };
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };

  toEdit = () => {
    const noteID = this.props.match.params.id;
    this.props.history.push(`/edit/${noteID}`);
  };

  delete = () => {
    console.log(this.state.id);
    const noteID = this.state.id;

    axios
      .delete(`https://backendprojectserver.herokuapp.com/notes/${noteID}`)
      .then(response => {
        console.log(response);
        this.setState(
          {
            title: response.data.title,
            contents: response.data.contents
          },
          () => this.props.history.push("/")
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <SingleNoteContainer>
        <EditDeleteDiv>
          <EditDeleteButton onClick={this.toEdit}>edit</EditDeleteButton>
          <EditDeleteButton onClick={this.cloneNote}>clone</EditDeleteButton>
          <ModalExample {...this.props} id={this.state.id} />
        </EditDeleteDiv>
        <SingleNoteDiv>
          <NoteTitle>{this.state.title}</NoteTitle>
          <NoteText>{this.state.contents}</NoteText>
        </SingleNoteDiv>
      </SingleNoteContainer>
    );
  }
}

export default IndividualNote;

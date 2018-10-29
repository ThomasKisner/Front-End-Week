import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import ModalExample from "./modal";

const SingleNoteContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  height: 100%;
`;

const EditDeleteDiv = styled.div`
  margin-top: 20px;
  margin-left: 80%;
`;

const EditDeleteButton = styled.h4`
padding-top: 15px
text-decoration-line: underline;
display: inline;
margin: 0 7%;
&:hover {
  cursor: pointer;
}
`;

const NoteTitle = styled.h2`
  margin-left: 3%;
  margin-bottom: 35px;
`;

const NoteText = styled.p`
  margin-left: 3%;
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
    
    this.setState({id: noteID});
    this.getNote(noteID); 
  }

  getNote = noteID => {
    axios
      .get(`http://localhost:9000/notes/${noteID}`)
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

  toEdit= () => {
    const noteID = this.props.match.params.id;
    this.props.history.push(`/edit/${noteID}`)}

  delete = () => {
    console.log(this.state.id)
    const noteID = this.state.id;

    axios
      .delete(`http://localhost:9000/notes/${noteID}`)
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
          <ModalExample  {...this.props}   id={this.state.id}/>
        </EditDeleteDiv >
        <NoteTitle>{this.state.title}</NoteTitle>
        <NoteText>{this.state.contents}</NoteText>
        
      </SingleNoteContainer>
    );
  }
}

export default IndividualNote;

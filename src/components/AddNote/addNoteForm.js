import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const NewNoteContainer = styled.div`
background-color: #373940;
display: flex;
flex-direction: column;
justify-content: flex-start

min-height: 100vh;
height:100%;
width: 100%;;
margin: 0 auto;
`;

const NewNoteH1 = styled.h1`
color:#ffffff;
  margin-left: 3%;
  margin-top: 50px;
`;

const TitleInput = styled.input`
height: 40px;
border-radius: 5px;
width: 50%
margin: 10px 0;
margin-left: 3%;
::placeholder{
 padding-left: 3%;
} 
`;
const TextInput = styled.textarea`
border-radius: 5px;
width: 90%
margin: 10px 0;
margin-left: 3%;
height: 275px;
::placeholder{
  padding-left: 1%;
  padding-top:1%;
 } 
`;

const SaveButton = styled.h3`
  background-color: #00bcba;
  color: #ffffff;
  height: auto;
  width: 18%;
  display: inline-block;
  padding: 10px 15px;
  text-align: center;
  margin-left: 3%;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

class AddNoteForm extends Component {
  state = {
    title: "",
    contents: ""
  };

  handleSave = () => {
    const newNote = { title: this.state.title, contents: this.state.contents };

    axios
      .post(`https://backendprojectserver.herokuapp.com/notes`, newNote)
      .then(response => {
        this.setState(
          {
            title: "",
            text: ""
          },
          () => this.props.history.push("/")
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log([event.target.name] + event.target.value);
  };
  render() {
    return (
      <NewNoteContainer>
        <NewNoteH1>Create New Note</NewNoteH1>
        <TitleInput
          type="text"
          placeholder="Title"
          className="title-input"
          name="title"
          onChange={this.handleInput}
        />
        <TextInput
          type="textarea"
          placeholder="Note Content"
          name="contents"
          onChange={this.handleInput}
        />
        <SaveButton onClick={this.handleSave}>Save</SaveButton>
      </NewNoteContainer>
    );
  }
}

export default AddNoteForm;

import React, { Component } from "react";
import axios from "axios";
import styled from 'styled-components';

const EditNoteContainer = styled.div`
width: 100%;
min-height: 100vh;
height: 100%;
display: flex; 
flex-direction: column;
background-color: #373940;
`;

const EditNoteTitle = styled.h2`
color: #ffffff;
margin-left: 3%;
margin-top: 50px;
`;

const NoteTitle = styled.input`
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
  background-color: #00BCBA;
  color: #FFFFFF;
  height: auto;
  width: 18%;
  display: inline-block;
  padding: 10px 15px;
  text-align: center;
  margin-left: 3%;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
  }
`;


class EditNote extends Component {
  state = {
    title: "",
    contents: "",
    id: ""
  };

  componentDidMount() {
    const noteID = this.props.match.params.id;
    this.getNote(noteID);

    console.log(this.state.id)
  }

  getNote = (noteID) => {
    axios
      .get(`https://backendprojectserver.herokuapp.com/notes/${noteID}`)
      .then(response => {
        this.setState({
          title: response.data[0].title,
          contents: response.data[0].contents,
          id: response.data[0].id
        });
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateNote = () => {
    const updatedNote = {
      title: this.state.title,
      contents: this.state.contents,
      id: this.state.id
    };
    axios
      .put(`https://backendprojectserver.herokuapp.com/notes/${this.state.id}`, updatedNote)
      .then(response => {
        console.log(response.data, updatedNote);
      })
      .catch(err => {
        console.log(err);
      });
      this.props.history.push("/")
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log('title is now: ' + this.state.title);
    console.log('Content is now: ' + this.state.contents);
  };

  render() {
    return (
      <EditNoteContainer>
        <EditNoteTitle>Edit Note:</EditNoteTitle>
        <NoteTitle type="text" placeholder={this.state.title} onChange={this.handleInput} name='title'/>
        <TextInput type="text" placeholder={this.state.contents} onChange={this.handleInput} name='contents'/>

        <SaveButton onClick={this.updateNote}>update</SaveButton>
      </EditNoteContainer>
    );
  }
}

export default EditNote;

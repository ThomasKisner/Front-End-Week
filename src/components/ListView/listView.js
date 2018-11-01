import React, { Component } from "react";
import styled from "styled-components";


const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  min-height: 100vh;
  width: 100%;
  height: auto;
  background-color: #373940;
`;

const SearchBarDiv = styled.div`
  width: 100%;
  height: auto;
  padding-top: 50px;
`;

const NotesContainerH2 = styled.h2`
  display: inline;
  font-size: 1.5em;
width:25%
  font-weight: bold;
  padding-left: 2%;
  padding-top: 50px;
  color: #ffffff;
`;

const SearchInput = styled.input`
  type: text;

  display: inline;
  font-size: 1em;
  width: 24%;
  font-weight: bold;
  padding-left: 2%;

  border-radius: 5px;
`;

const NotesListView = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 30%;
  border-radius: 5px;
  height: 200px;
  margin: 15px 0;
  text-align: left;
  word-wrap: break-word;
  background-color: #ffffff;
  overflow: hidden;
`;

const NoteTitle = styled.h3`
  font-weight: bold;
  border-bottom: 1px solid #d0d0d0;
  width: 90%;
  height: 25%
  margin: 10px auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: baseline;
  &:Hover {
    cursor: pointer;
  }
`;

const NoteBody = styled.p`
  color: black;
  text-decoration: none;
  width: 90%;
  height: 85%;
  margin: 0 auto;
  overflow: hidden;
  white-space: normal;
  text-overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;

const SideBarH3 = styled.h3`
  background-color: #00BCBA;
  color: #FFFFFF;
  height: auto;
  width: 9%;
  display: inline-block;
  padding: 6px 5px;
  margin-left: 1.5%;
  text-align: center;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  &: hover{
    cursor: pointer;
  }
}
`;

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchTerm: "",
      filteredArray: []
    };
  }

  componentWillMount() {
    console.log(this.props.allNotes);
    this.initialState();
  }

  initialState = () => {
    console.log("inside of CDM");

    this.setState(
      {
        notes: this.props.allNotes
      },
      () => console.log(this.props.Allnotes)
    );
  };

  handleInput = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      console.log(this.state.searchTerm);
    });
  };

  searchNotes = () => {
    console.log("inside of called function");
    console.log(this.state.notes);
    console.log(this.props);
    console.log(this.props.allNotes);
    // console.log(this.state.notes);
    // const notes = this.props.AllNotes.filter(note =>
    //   note.contents.includes("this.state.searchTerm")
    // );
    // this.setState({ filteredArray: notes }, () =>
    //   console.log(this.filteredArray)
    // );
  };

  render() {
    return (
      <NotesContainer>
        <SearchBarDiv>
          <NotesContainerH2>Your Notes: </NotesContainerH2>
         
          <SearchInput
            placeholder={"...search notes"}
            name="title"
            onChange={this.handleInput}
          />
          <SideBarH3 onClick={this.searchNotes}>Search</SideBarH3>
        </SearchBarDiv>

        {this.props.allNotes.map(note => {
          return (
            <NotesListView key={note.id}>
              <NoteTitle
                onClick={() => this.props.history.push(`/notes/${note.id}`)}
              >
                {note.title}
              </NoteTitle>
              <NoteBody
                onClick={() => this.props.history.push(`/notes/${note.id}`)}
              >
                {note.contents}
              </NoteBody>
            </NotesListView>
          );
        })}
      </NotesContainer>
    );
  }

}

export default ListView;

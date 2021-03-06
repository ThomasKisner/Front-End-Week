import React, { Component } from "react";
import "../style/App.css";
import axios from "axios";
import ListViewHolder from "../components/ListView/listViewHolder";
import { AddNote } from "../components/AddNote/addNote";
import { Route } from "react-router-dom";
import SingleNoteHolder from '../components/SingleNote/SingleNoteHolder';
import EditNoteHolder from '../components/EditNote/editNoteHolder';
import Authenticate from './Authenticate/Authenticate';

class App extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    axios
      .get(`https://backendprojectserver.herokuapp.com/notes`)
      .then(response => { 
        this.setState({ notes: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(){
    axios
    .get(`https://backendprojectserver.herokuapp.com/notes`)
    .then(response => {
      this.setState({ notes: response.data });
    })
    .catch(err => {
      console.log(err);
    });
  }


  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <ListViewHolder {...props} allNotes={this.state.notes} />}
        />
        <Route path="/addnote" render={props=> <AddNote  {...props}/>}/>
        <Route
          path="/notes/:id" 
          render={props=> <SingleNoteHolder {...props} notes={this.state.notes} />}
          />
           <Route
          path="/edit/:id" 
          render={props=> <EditNoteHolder {...props} notes={this.state.notes} />}
          />
        
      </div>
    );
  }
}

export default Authenticate(App);

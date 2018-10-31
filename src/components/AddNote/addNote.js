import React from "react";
import SideBar from "../sidebar";
import AddNoteForm from "./addNoteForm";
import styled from 'styled-components';

const AddNoteDiv = styled.div`
display: flex;
    width: 1200px;
    margin: 0 auto;
`;

export const AddNote = (props) => {
  return (
    <AddNoteDiv>
      <SideBar />
      <AddNoteForm {...props} />
    </AddNoteDiv>
  );
};



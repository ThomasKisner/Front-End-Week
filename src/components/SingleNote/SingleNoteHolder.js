import React from 'react';
import SideBar from "../sidebar";
import IndividualNote from './individualNote'; 
import styled from 'styled-components';

const SingleNoteDiv = styled.div`
display: flex;
    width: 1200px;
    margin: 0 auto;
`;


const SingleNoteHolder = props => {
  return (
    <SingleNoteDiv>
      <SideBar />
      <IndividualNote {...props} notes={props.notes} />
    </SingleNoteDiv>
  )
};

export default SingleNoteHolder;

import React from "react";
import SideBar from "../sidebar";
import ListView from "./listView";
import styled from "styled-components";

const ListViewDiv = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
`;

const ListViewHolder = props => {
  return (
    <ListViewDiv>
      <SideBar />
      <ListView {...props} allNotes={props.allNotes} />
    </ListViewDiv>
  );
};

export default ListViewHolder;

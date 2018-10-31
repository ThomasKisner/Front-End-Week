import React from "react";
import SideBar from "../sidebar";
import ListView from "./listView"; 

const ListViewHolder = props => {
 
  return (
    <div className={"container"}>
      <SideBar />
  <ListView {...props} allNotes={props.allNotes} />  
    </div>
  );
};

export default ListViewHolder;

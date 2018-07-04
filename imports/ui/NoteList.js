import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Notes } from "../api/notes";
import NoteListHeader from "./NodeListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";

export const NoteList = props => {
  return (
    <div>
      <NoteListHeader />
      {props.notes.length ? (
        props.notes.map(note => <NoteListItem key={note._id} note={note} />)
      ) : (
        <NoteListEmptyItem />
      )}
      <p>NoteList {props.notes.length}</p>
    </div>
  );
};

NoteList.propTypes = {
  notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe("notes");

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);

import React from "react";
import { createContainer } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Notes } from "../api/notes";
import NoteListHeader from "./NodeListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";
import { Session } from "meteor/session";

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
  const selectedNoteId = Session.get("selectedNoteId");
  Meteor.subscribe("notes");

  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    })
      .fetch()
      .map(note => {
        return {
          ...note,
          selected: note._id === selectedNoteId
        };
      })
  };
}, NoteList);

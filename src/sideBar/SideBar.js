import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SideBarItem from "../sideBarItem/SideBarItem";

const SideBar = ({
  notes,
  classes,
  selectedNoteIndex,
  selectNote,
  deleteNote,
  newNote,
  title,
  setTitle,
  addingNote,
  setAddingNote,
}) => {
  const newNoteBtnClick = () => {
    setAddingNote(!addingNote);
    setTitle(null);
  };

  const updateTitle = (txt) => {
    setTitle(txt);
  };

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              type="text"
              placeholder="Enter note title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            />
            <Button
              className={classes.newNoteSubmitBtn}
              onClick={() => newNote(title)}
            >
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((_note, _index) => {
            return (
              <div key={_index}>
                <SideBarItem
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={selectNote}
                  deleteNote={deleteNote}
                />
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default withStyles(styles)(SideBar);

import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import debounce from "../hooks/helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

const Editor = ({
  classes,
  notes,
  setNotes,
  selectedNote,
  setSelectedNote,
  selectedNoteIndex,
  setSelectedNoteIndex,
  title,
  setTitle,
  noteUpdate,
  id,
  setId,
  text,
  setText,
}) => {
  const updateBody = async (val) => {
    await setText(val);
    update();
  };

  const update = useRef(
    debounce(() => {
      noteUpdate(selectedNote.id, {
        title: selectedNote.title,
        body: selectedNote.body,
      });
    }, 1500)
  ).current;

  useEffect(() => {
    setText(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote]);

  return (
    <div className={classes.editorContainer}>
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);
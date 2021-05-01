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
    update(val);
  };

  const update = useRef(
    debounce((text) => {
      noteUpdate(selectedNote.id, {
        title: selectedNote.title,
        body: text,
      });
    }, 1500)
  ).current;

  const updateTitle = async (txt) => {
    await setTitle(txt);
    update();
  };

  useEffect(() => {
    setText(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote, setId, setText, setTitle]);

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder="Note title..."
        value={title ? title : ""}
        onChange={(e) => updateTitle(e.target.value)}
      ></input>
      <ReactQuill value={text} onChange={(e) => updateBody(e)}></ReactQuill>
    </div>
  );
};

export default withStyles(styles)(Editor);

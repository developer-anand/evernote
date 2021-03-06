import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../hooks/helpers";

const SideBarItem = ({
  _index,
  _note,
  selectedNoteIndex,
  classes,
  selectNote,
  deleteNote,
}) => {
  return (
    <div key={_index}>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => selectNote(_note, _index)}
        >
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={() => deleteNote(_note)}
        ></DeleteIcon>
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SideBarItem);
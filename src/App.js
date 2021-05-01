import "./App.css";
import React, { useState, useEffect } from "react";
import firebase from "./firebase/firebase";
import SideBar from "./sideBar/SideBar";
import Editor from "./editor/Editor";
import { timestamp } from "./firebase/firebase";

const App = () => {
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [id, setId] = useState(null);

  // n -> note, i -> index
  const selectNote = (n, i) => {
    setSelectedNote(n);
    setSelectedNoteIndex(i);
  };

  // e -> note
  const deleteNote = async (e) => {
    if (window.confirm(`Are you sure you want to delete: ${e.title}`)) {
      const noteIndex = notes.indexOf(e);
      await setNotes(notes.filter((_note) => _note !== e));
      if (selectedNoteIndex === noteIndex) {
        setSelectedNoteIndex(null);
        setSelectedNote(null);
      } else {
        notes.length > 1
          ? selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)
          : setSelectedNoteIndex(null);
        setSelectedNote(null);
      }
      firebase.firestore().collection("notes").doc(e.id).delete();
    }
  };

  const newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };
    const newFromDB = await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      timestamp: timestamp,
    });
    const newID = newFromDB.id;
    await setNotes([...notes, note]);
    const newNoteIndex = notes.indexOf(
      notes.filter((_note) => _note.id === newID[0])
    );
    console.log("index", notes[newNoteIndex]);
    setSelectedNote(notes[newNoteIndex]);
    setSelectedNoteIndex(newNoteIndex);
    setTitle(null);
    setAddingNote(false);
  };

  const noteUpdate = (id, noteObj) => {
    if (id) {
      firebase.firestore().collection("notes").doc(id).update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: timestamp,
      });
    }
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((serverUpdate) => {
        const notes = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        setNotes(notes);
      });
  }, []);

  return (
    <div className="App">
      <SideBar
        notes={notes}
        selectedNoteIndex={selectedNoteIndex}
        selectNote={selectNote}
        deleteNote={deleteNote}
        newNote={newNote}
        addingNote={addingNote}
        setAddingNote={setAddingNote}
        title={title}
        setTitle={setTitle}
      />
      {selectedNote && (
        <Editor
          notes={notes}
          setNotes={setNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          selectedNoteIndex={selectedNoteIndex}
          setSelectedNoteIndex={setSelectedNoteIndex}
          title={title}
          setTitle={setTitle}
          noteUpdate={noteUpdate}
          id={id}
          setId={setId}
          text={text}
          setText={setText}
        />
      )}
    </div>
  );
};

export default App;

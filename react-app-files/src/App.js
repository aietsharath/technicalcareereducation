import React,{ useState } from 'react';
import './App.css';
import Header from './components/Header';
import CreateNote from './components/createNote';
import NotesList from './components/noteList';
import Delete from './components/deleteNote';

function App() {
  //api
  const [responseData, setResponseData] = useState(null);
  //
  const [note, setNote] = useState({
    title: "",
    body: "",
    color: ""
  });


  function addNote(newNote) {
    setNote(prevNotes => {
      const updatedNote = { ...prevNotes, newNote };
      console.log(updatedNote);
      return updatedNote;
    });
    handlePostUserNoteRequest(note);
  }
  
  //api
  async function handlePostUserNoteRequest(newNote) {
    try {
         


      const response = await fetch('http://localhost:5000/createNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data, () => {
        console.log('Response from server:', responseData);
      });
    } catch (error) {
      console.error('Error while making the request:', error);
    }
  };
  //api

  return (
    <div className="App">
      <Header />
      <CreateNote onAdd={addNote} />
      <NotesList  />
      <Delete />
    </div>
  );
}

export default App;

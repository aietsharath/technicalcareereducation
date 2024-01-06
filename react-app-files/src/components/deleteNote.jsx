import React, { useState, useEffect } from 'react';

const Delete = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getUserNotes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error while fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5000/deleteNote/${noteId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the frontend state after successful deletion
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== noteId)
      );
    } catch (error) {
      console.error('Error while deleting note:', error);
    }
  };

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>Title:</strong> {note.title},
            <strong>Body:</strong> {note.body},
            <strong>Color:</strong> {note.color}
            <button onClick={() => handleDeleteNote(note._id)}>
              Delete Note
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Delete;

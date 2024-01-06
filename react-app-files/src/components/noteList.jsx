import React, { useState ,useEffect } from 'react';

const NotesList = () => {
  const [updateData, setUpdateData] = useState([{
    title: '',
    body: '',
    color: '',
  }]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/getUserNotes');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // props.onAdd(updateData)
      setUpdateData(data);
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const handleUpdateNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5000/updateNote/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Fetch updated data after successful update
      fetchData();
      setShowForm(false);
    } catch (error) {
      console.error('Error while updating note:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleForm = (noteId) => {
    setShowForm(!showForm);
    setSelectedNoteId(noteId);
  };

  return (
    <div>
      <ul>
        {updateData.map((note) => (
          <li key={note._id}>
            <strong>Title:</strong> {note.title}
            <strong>Body:</strong> {note.body}
            <strong>Color:</strong> {note.color}
            <button onClick={() => handleToggleForm(note._id)}>
              {showForm && selectedNoteId === note._id ? 'Hide Form' : 'Show Form'}
            </button>
            {showForm && selectedNoteId === note._id && (
              <form>
                <label>
                  New Title:
                  <input
                    type="text"
                    name="title"
                    value={updateData.title}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  New Body:
                  <input
                    type="text"
                    name="body"
                    value={updateData.body}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  New Color:
                  <input
                    type="text"
                    name="color"
                    value={updateData.color}
                    onChange={handleInputChange}
                  />
                </label>
                <button onClick={() => handleUpdateNote(note._id)}>
                  Update Note
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
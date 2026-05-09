import { useEffect, useState } from "react";
import axios from "axios";

import NoteCard from "./components/NoteCard";

function App() {

  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);


  // FETCH NOTES
  const fetchNotes = async () => {

    try {

      const response = await axios.get(
        "https://employee-notes-backend.onrender.com/api/notes"
      );

      setNotes(response.data);

    } catch (error) {

      console.log(error);

    }

  };


  // ADD NOTE
  const addNote = async () => {

    if (!title || !description) {
      return alert("Please fill all fields");
    }

    try {

      await axios.post(
        "https://employee-notes-backend.onrender.com/api/notes",
        {
          title,
          description
        }
      );

      setTitle("");
      setDescription("");

      fetchNotes();

    } catch (error) {

      console.log(error);

    }

  };


  // DELETE NOTE
  const deleteNote = async (id) => {

    try {

      await axios.delete(
        `https://employee-notes-backend.onrender.com/api/notes/${id}`
      );

      fetchNotes();

    } catch (error) {

      console.log(error);

    }

  };


  // EDIT NOTE
  const editNote = (note) => {

    setTitle(note.title);

    setDescription(note.description);

    setEditingId(note._id);

  };


  // UPDATE NOTE
  const updateNote = async () => {

    try {

      await axios.put(
        `https://employee-notes-backend.onrender.com/api/notes/${editingId}`,
        {
          title,
          description
        }
      );

      setTitle("");
      setDescription("");
      setEditingId(null);

      fetchNotes();

    } catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    fetchNotes();

  }, []);


  return (

    <div className="container">

      <h1>Employee Notes Dashboard</h1>

      <div className="form">

        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {
          editingId ? (

            <button onClick={updateNote}>
              Update Note
            </button>

          ) : (

            <button onClick={addNote}>
              Add Note
            </button>

          )
        }

        {/* <button onClick={fetchNotes}>
          Show All Notes
        </button> */}

      </div>

      <div className="notes-container">

        {
          notes.map((note) => (

            <NoteCard
              key={note._id}
              note={note}
              deleteNote={deleteNote}
              editNote={editNote}
            />

          ))
        }

      </div>

    </div>

  );
}

export default App;
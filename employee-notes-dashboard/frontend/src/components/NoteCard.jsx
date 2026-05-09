function NoteCard({ note, deleteNote, editNote }) {

  return (

    <div className="card">

      <h2>{note.title}</h2>

      <p>{note.description}</p>

      <small>
        Created At:
        {" "}
        {new Date(note.createdAt).toLocaleDateString()}
      </small>

      <div className="btns">

        <button
          className="edit-btn"
          onClick={() => editNote(note)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteNote(note._id)}
        >
          Delete
        </button>

      </div>

    </div>

  );
}

export default NoteCard;
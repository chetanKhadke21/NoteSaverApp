import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromNotes, resetAllNotes } from "../redux/notesSlice";
import { ToastContainer, toast } from "react-toastify";
import ShareButtonWithPopup from "./ShareButtonWithPopup";
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from '@mui/icons-material/Delete';


const Home = () => {
  const [search, setSearch] = useState("");
  const notesArr = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = () => toast.success("Note deleted successfully");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notesArr));
  }, [notesArr]);

  const searchHandler = (e) => {
    e.preventDefault();
    setSearch("");
  };

  const deleteHandler = (note) => {
    dispatch(removeFromNotes(note.id));
    notify();
  };

  const viewHandler = (note) => {
    navigate(`/notes/${note.id}`);
  };

  const editHandler = (id) => {
    navigate(`/notes/${id}/edit`);
  };

  const deleteAllHandler = () => {
    dispatch(resetAllNotes());
  };

  return (
    <div className="min-h-screen text-gray-900 px-4 sm:px-10 pt-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Quick Notes</h1>
        <p className="text-gray-500">Capture Every Thought, Beautifully.</p>
        <button
          onClick={() => navigate("/add")}
          className="mt-6 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition"
        >
          Create New Note
        </button>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={searchHandler}
        className="flex flex-col sm:flex-row gap-4 sm:items-center justify-center max-w-3xl mx-auto mb-8"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search your note..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          disabled={!notesArr.length}
          className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 disabled:opacity-50 transition"
        >
          Search
        </button>
        <button
          type="button"
          onClick={deleteAllHandler}
          className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition whitespace-nowrap"
        >
          Delete All
        </button>
      </form>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {notesArr[0] &&
          notesArr
            .filter((note) =>
              note.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((note) => (
              <div
  key={note.id}
  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 
             hover:shadow-xl hover:border-gray-300 transition-all duration-300 
             transform hover:-translate-y-2 hover:scale-[1.02] 
             animate-fadeIn relative overflow-hidden"
>
  {/* Subtle gradient overlay for movie-card feel */}
  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/5 to-transparent pointer-events-none rounded-2xl"></div>

  {/* Title */}
  <div className="flex justify-between items-start mb-4">
    <h2 className="text-xl font-semibold text-gray-900">{note.title}</h2>
  </div>

  {/* Content */}
  <p className="text-gray-600 leading-relaxed mb-6 text-sm relative z-10">
    {note.content.slice(0, 150)}
    {note.content.length > 150 ? "..." : ""}
  </p>

  {/* Action Buttons */}
  <div className="flex flex-wrap gap-3 mt-auto relative z-10">
    <button
      className="text-sm px-4 py-2 text-white rounded bg-gray-800 hover:bg-gray-700 transition"
      onClick={() => editHandler(note.id)}
      title="Edit"
    >
      <EditDocumentIcon fontSize="small" />
    </button>

    <button
      className="text-sm px-4 py-2 text-white rounded bg-gray-800 hover:bg-gray-700 transition"
      onClick={() => viewHandler(note)}
      title="View Note"
    >
      <PreviewIcon fontSize="small" />
    </button>

    <button
      className="text-sm px-4 py-2 text-white rounded bg-gray-800 hover:bg-gray-700 transition"
      onClick={() => deleteHandler(note)}
      title="Delete"
    >
      <DeleteIcon fontSize="small" />
    </button>

    <div className="text-sm bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition">
      <ShareButtonWithPopup title={note.title} content={note.content} />
    </div>
  </div>
</div>


            ))}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        theme="dark"
      />
    </div>
  );
};

export default Home;

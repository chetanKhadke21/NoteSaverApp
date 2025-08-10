import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeFromNotes } from "../redux/notesSlice";
import { ToastContainer, toast } from "react-toastify";
import ShareButtonWithPopup from "./ShareButtonWithPopup";

const ViewNotes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const notesArr = useSelector((state) => state.notes.notes);
  const note = notesArr.find((note) => note.id === id);

  function deleteHandler() {
    dispatch(removeFromNotes(note.id));
    navigate("/");
  }

  function editHandler() {
    navigate(`/notes/${note.id}/edit`);
  }

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Note not copied successfully");
      });
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          View Note
        </h2>

        <div className="flex flex-col gap-6">
          {/* Title Field */}
          <input
            type="text"
            value={note.title}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-sm sm:text-base"
            disabled
          />

          {/* Content Field */}
          <textarea
            rows={8}
            value={note.content}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 resize-none text-sm sm:text-base"
            disabled
          ></textarea>

          {/* Buttons Row */}
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={editHandler}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition"
            >
              Edit
            </button>
            <button
              onClick={deleteHandler}
              className="px-6 py-3 bg-red-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-red-500 transition"
            >
              Delete
            </button>
            <button
              onClick={() =>
                copyToClipboard(`${note.title}\n\n${note.content}`)
              }
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-300 transition"
            >
              Copy
            </button>

            <ShareButtonWithPopup title={note.title} content={note.content} className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-300 transition"/>
          </div>

        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ViewNotes;

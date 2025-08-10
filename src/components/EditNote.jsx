import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateNotes } from "../redux/notesSlice";
import { ToastContainer, toast } from "react-toastify";

const EditNote = () => {
  const { id } = useParams();
  const notesArr = useSelector((state) => state.notes.notes);
  const note = notesArr.find((n) => n.id === id);

  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <p className="text-gray-600">Note not found.</p>
      </div>
    );
  }

  const notify = (msg) => toast.success(msg);

  function editNoteHandler(e) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    dispatch(updateNotes({ id, title, content }));

    navigate(`/notes/${id}`)
  }

  function cancelHandler() {
    navigate(`/`);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="text-center border-b border-gray-100 px-6 py-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
            Edit Note
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Update your note details below.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={editNoteHandler}
          className="p-6 sm:p-8 flex flex-col gap-6"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-50 text-gray-800 text-sm sm:text-base"
            required
          />

          <textarea
            name="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 bg-gray-50 text-gray-800 resize-y min-h-[200px] text-sm sm:text-base"
            required
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={cancelHandler}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-800 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition"
            >
              Save
            </button>
          </div>
        </form>
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

export default EditNote;

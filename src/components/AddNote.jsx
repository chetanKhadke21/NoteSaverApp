import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addToNotes } from "../redux/notesSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const notify = () => toast.success("Note added successfully");

  function addHandler(e) {
    e.preventDefault();

    const note = {
      title,
      content,
      id: uuidv4(),
    };

    dispatch(addToNotes(note));
    setTitle("");
    setContent("");
    notify();
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Create New Note
        </h2>

        <form onSubmit={addHandler} className="flex flex-col gap-6">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-800 placeholder-gray-400 text-sm sm:text-base"
            required
          />

          {/* Content Textarea */}
          <textarea
            name="content"
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 text-gray-800 placeholder-gray-400 resize-none text-sm sm:text-base"
            required
          ></textarea>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 transition"
            >
              Add Note
            </button>
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
        </form>
      </div>
    </div>
  );
};

export default AddNote;

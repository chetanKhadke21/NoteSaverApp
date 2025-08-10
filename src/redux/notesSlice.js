import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes : JSON.parse(localStorage.getItem("notes")) || []
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state, action) => {
      const note = action.payload
      state.notes.push(note)
    },
    removeFromNotes: (state, action) => {
      const id = action.payload
      state.notes = state.notes.filter(note => note.id !== id)
    },
    updateNotes: (state, action) => {
      const {id, title, content} = action.payload
      const existingNote = state.notes.find(note => note.id === id)
      if(existingNote){
        existingNote.title = title
        existingNote.content = content
      }
    },
    resetAllNotes : (state, action) => {
      state.notes = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToNotes, removeFromNotes, updateNotes, resetAllNotes } = notesSlice.actions

export default notesSlice.reducer
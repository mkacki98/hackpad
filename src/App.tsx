import './App.css';

import MainEditor from "./components/MainEditor";
import Sidebar from "./components/Sidebar";
import useNotes from './hooks/useNotes';

export default function App() {
  const { allNotes, displayedNote, saveNote, deleteNote, loadNoteContent, createNote} = useNotes();

  return (
    <div className="app">
      <Sidebar
        Notes={allNotes}
        loadNoteContent={loadNoteContent}
        deleteNote={deleteNote}
        createNote = {createNote}
      />
      <MainEditor displayedNote={displayedNote} saveNote={saveNote} />
    </div>
  );
}
import './App.css'

import MainEditor from "./components/MainEditor";
import Sidebar from "./components/Sidebar";

import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';
import { useEffect, useState } from 'react';

export default function App() {
  const [notes, setNotes] = useState<Array<Record<string, string>>>([]);
  const [activeNote, setActiveNote] = useState(0);
  const [activeNoteContent, setActiveNoteContent] = useState("");

  const updateNotes = (notes: Array<Record<string, string>>) => {
    setNotes([...notes]);
    setNotesOnLocalStorage(JSON.stringify(notes));
  };

  const deleteNote = async (noteID: number) => {
    await removeFile(notes[noteID].location);

    notes.splice(noteID, 1);
    // reason we used spread operator is because if we didn't,
    // it would send the same object reference and useState wasn't updating it
    updateNotes(notes);

    if (activeNote >= noteID) {
      setActiveNoteData(activeNote >= 1 ? activeNote - 1 : 0);
    }
  };

  const addNote = async () => {
    const savePath = await save();
    if (!savePath) return;

    await writeTextFile(`${savePath}.txt`, "");

    const myNewNote = {
      title: "New note",
      created_at: `${dayjs().format("ddd, DD MMMM YYYY")} at ${dayjs().format(
        "hh:mm A"
      )}`,
      location: `${savePath}.txt`,
    };

    updateNotes([{ ...myNewNote }, ...notes]);
    setActiveNote(0);
    setActiveNoteContent("");
  };

  const handleChange = ({
    target: { value },
  }: {
    target: { value: string };
  }) => {
    if (notes.length === 0) return;

    const header = value.split(/\r?\n/)[0];
    if (notes.length !== 0 && notes[activeNote].title !== header) {
      notes[activeNote].title = header;
      updateNotes([...notes]);
    }

    setActiveNoteContent(value);
    writeTextFile(notes[activeNote].location, value);
  };

  const setActiveNoteData = async (index: number) => {
    setActiveNote(index);

    if (notes.length === 0) setActiveNoteContent("");
    else {
      const contents = await readTextFile(notes[index].location);
      setActiveNoteContent(contents);
    }
  };

  useEffect(() => {
    const getNotesFromStorage = async () => {
      const myNotes = await getNotes();

      setNotes(myNotes);
    };

    getNotesFromStorage();
  }, []);

  return (
    <div className="app">
        {saveError && <div className="error-message">{saveError}</div>}
      <Sidebar
        notepads={notepads}
        saveNotepad={saveNotepad}
        loadNotepadContent={loadNotepadContent}
      />
      <MainEditor notepadContent={notepadContent} />
    </div>
  );
}
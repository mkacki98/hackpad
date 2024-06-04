import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {daybookTemplate} from '../templates/daybookTemplate';

interface Note {
  id: string;
  headline: string;
  content: string;
} 


export default function useNotes() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [displayedNote, setDisplayedNoteState] = useState<Note | null>(null);

  const setDisplayedNote = (id: string, headline: string, content: string): void => {
    setDisplayedNoteState({ id, headline, content });
  };

  useEffect(() => {
    // load from locastorage on mount
    // const loadNotes = () => {
    //   try {
    //     const savedNotesData = localStorage.getItem('notes');
    //     const savedNotes = savedNotesData ? JSON.parse(savedNotesData) : [];
    //     setAllNotes(savedNotes);
    //   } catch (error) {
    //     console.error('Err  or loading Notes on mount:', error);
      
    // };
    const deleteAllNotes = () => {
      try {
        setAllNotes([]);
        localStorage.setItem('notes', JSON.stringify([]));
      } catch (error) {
        console.error('Error deleting all Notes:', error);
      }
    };

    deleteAllNotes(); 
    //loadNotes();
  }, []);
  

  const createNote = () => {
    const id = uuidv4();

    const currentDate = new Date();
    let formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

    const newNote = {id: id, headline: formattedDate, content: daybookTemplate};
    saveNote(newNote);
    setDisplayedNote(newNote.id, newNote.headline, newNote.content);
  }

  async function saveNote(note: Note): Promise<void>;
  async function saveNote(id: string, headline: string, content: string): Promise<void>;
  async function saveNote(idOrNote: string | Note, headline?: string, content?: string): Promise<void> {
    let note: Note;
  
    if (typeof idOrNote === 'string') {
      note = { id: idOrNote, headline: headline!, content: content! };
    } else {
      note = idOrNote;
    }
  
    try {
      const existingNoteIndex = allNotes.findIndex(n => n.id === note.id);
  
      let updatedNotes;
      if (existingNoteIndex !== -1) {
        updatedNotes = [...allNotes];
        updatedNotes[existingNoteIndex] = note;
      } else {
        updatedNotes = [...allNotes, note];
      }
      setAllNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));

    } catch (error) {
      console.error('Error in saveNote: ', error);
    }
  };

  // useEffect(() => {
  //   console.log("All notes after successful saving: ", allNotes);
  // }, [allNotes]);

  const deleteNote = (Note: Note) => {
    try {
      const updatedNotes = allNotes.filter(n => n.id !== Note.id);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setAllNotes(updatedNotes);
      if (updatedNotes.length === 0) {
        setDisplayedNoteState(null);
      }

    } catch (error) {
      console.error('Error in deleteNote:', error);
    }
  };

  const loadNoteContent = (Note: Note) => {
    console.log("Currently loaded note: ", displayedNote.headline, "Loading note: ", Note.headline)
    try {
      const savedNotesData = localStorage.getItem('notes');
      const savedNotes = savedNotesData ? JSON.parse(savedNotesData) : [];
      const selectedNote = savedNotes.find((existingNote: Note) => existingNote.id === Note.id);

      if (selectedNote) {
        setDisplayedNote(selectedNote.id, selectedNote.headline, selectedNote.content);
      }
    } catch (error) {
      console.error('Error loading Note content to the main interface:', error);
    }
  };

  return { allNotes, displayedNote, saveNote, deleteNote, loadNoteContent, createNote};
}
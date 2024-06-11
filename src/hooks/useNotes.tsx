import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {daybookTemplate} from '../templates/daybookTemplate';

interface Note {
  id: string;
  createdAt: string;
  title: string;
  headline: string;
  content: string;
} 


export default function useNotes() {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [displayedNote, setDisplayedNoteState] = useState<Note | null>(null);

  const setDisplayedNote = (id: string, createdAt: string, title: string, headline: string, content: string): void => {
    setDisplayedNoteState({ id, createdAt, title, headline, content });
  };

  useEffect(() => {
    console.log("Mount triggered.");
    const loadNotes = () => {
      try {
        //localStorage.clear(); // This will clear all data in localStorage
        const savedNotesData = localStorage.getItem('notes');
        const savedNotes = savedNotesData ? JSON.parse(savedNotesData) : [];
        setAllNotes(savedNotes);
      } catch (error) {
        console.error('Error loading Notes on mount:', error);
      }
    };
    loadNotes();
  }, [setAllNotes]);

  useEffect(() => {
    console.log(allNotes);
  }, [allNotes]);
  
  const createNote = () => {
    const id = uuidv4();
    console.log("Creating note.")

    const currentDate = new Date();
    let formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
    let createdAt = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}.${currentDate.getMilliseconds().toString().padStart(3, '0')}`;

    const newNote = {id: id, createdAt: createdAt, title: formattedDate, headline: formattedDate, content: daybookTemplate};
    saveNote(newNote);
    setDisplayedNote(newNote.id, newNote.createdAt, newNote.title, newNote.headline, newNote.content);
  }


  async function saveNote(note: Note): Promise<void>;
  async function saveNote(id: string, createdAt: string, title: string, headline: string, content: string): Promise<void>;
  async function saveNote(idOrNote: string | Note, createdAt?: string, title?: string, headline?: string, content?: string): Promise<void> {
    let note: Note;
  
    if (typeof idOrNote === 'string') {
      note = { id: idOrNote, createdAt: createdAt!, title: title!, headline: headline!, content: content! };
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
    try {
      const savedNotesData = localStorage.getItem('notes');
      const savedNotes = savedNotesData ? JSON.parse(savedNotesData) : [];
      const selectedNote = savedNotes.find((existingNote: Note) => existingNote.id === Note.id);

      if (selectedNote) {
        setDisplayedNote(selectedNote.id, selectedNote.createdAt, selectedNote.title, selectedNote.headline, selectedNote.content);
      }
    } catch (error) {
      console.error('Error loading Note content to the main interface:', error);
    }
  };

  return { allNotes, displayedNote, setAllNotes, saveNote, deleteNote, loadNoteContent, createNote};
}
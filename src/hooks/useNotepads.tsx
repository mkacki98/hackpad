import { useState, useEffect } from 'react';

interface Notepad {
  title: string;
  content: string;
}

export default function useNotepads() {
  const [notepads, setNotepads] = useState<Notepad[]>([]);
  const [selectedNotepad, setSelectedNotepad] = useState({ title: '', content: '' });

  useEffect(() => {
    // load from locastorage on mount
    // const loadNotepads = () => {
    //   try {
    //     const savedNotepadsData = localStorage.getItem('notepads');
    //     const savedNotepads = savedNotepadsData ? JSON.parse(savedNotepadsData) : [];
    //     setNotepads(savedNotepads);
    //   } catch (error) {
    //     console.error('Err  or loading notepads on mount:', error);
      
    // };
    const deleteAllnotepads = () => {
      try {
        setNotepads([]);
        localStorage.setItem('notepads', JSON.stringify([]));
      } catch (error) {
        console.error('Error deleting all notepads:', error);
      }
    };

    deleteAllnotepads(); 
    //loadNotepads();
  }, []);


  const clearEditor = () => {
    console.log("Using clearEditor.");
    const currentDate = new Date();
    let formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  
    const sameDateNotepads = notepads.filter(notepad => notepad.title.startsWith(formattedDate));
    if (sameDateNotepads.length > 0) {
      formattedDate += ` (${sameDateNotepads.length + 1})`;
    }
  
    setSelectedNotepad({ title: formattedDate, content: `<h2>${formattedDate}</h2>` });
  }

  const saveNotepad = async (title: string, content: string) => {
    console.log("Using saveNotepad.")
    try {
      const existingNotepadIndex = notepads.findIndex(notepad => notepad.title === title);
  
      let updatedNotepads;
      if (existingNotepadIndex !== -1) {
        // Notepad with the same title exists, overwrite it
        updatedNotepads = [...notepads];
        updatedNotepads[existingNotepadIndex] = { title, content };
      } else {
        // No notepad with the same title, create a new one
        const newNotepad = { title, content };
        updatedNotepads = [...notepads, newNotepad];
      }
  
      setNotepads(updatedNotepads);
      localStorage.setItem('notepads', JSON.stringify(updatedNotepads));
    } catch (error) {
      console.error('Error saving notepad:', error);
    }
  };

  const deleteNotepad = (notepad: Notepad) => {
    console.log("Using deleteNotepad.")
    try {
      const updatedNotepads = notepads.filter(n => n.title !== notepad.title);
      setNotepads(updatedNotepads);
      localStorage.setItem('notepads', JSON.stringify(updatedNotepads));
      if (selectedNotepad.title === notepad.title) {
        setSelectedNotepad({ title: '', content: '' });
      }
    } catch (error) {
      console.error('Error deleting notepad:', error);
    }
  };

  const loadNotepadContent = (notepad: Notepad) => {
    console.log("Using loadNotepadContent.")
    try {
      const savedNotepadsData = localStorage.getItem('notepads');
      const savedNotepads = savedNotepadsData ? JSON.parse(savedNotepadsData) : [];
      const selectedNotepad = savedNotepads.find((existingNotepad: Notepad) => existingNotepad.title === notepad.title);
      if (selectedNotepad) {
        setSelectedNotepad(selectedNotepad);
      }
    } catch (error) {
      console.error('Error loading notepad content to the main interface:', error);
    }
  };

  return { notepads, selectedNotepad, saveNotepad, deleteNotepad, loadNotepadContent, setSelectedNotepad, clearEditor};
}
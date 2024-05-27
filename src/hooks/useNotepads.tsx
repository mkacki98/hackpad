import { useState, useEffect } from 'react';

interface Notepad {
  title: string;
  content: string;
}

export default function useNotepads() {
  const [notepads, setNotepads] = useState<Notepad[]>([]);
  const [selectedNotepad, setSelectedNotepad] = useState({ title: '', content: '' });

  useEffect(() => {
    const loadNotepads = () => {
      try {
        const savedNotepadsData = localStorage.getItem('notepads');
        const savedNotepads = savedNotepadsData ? JSON.parse(savedNotepadsData) : [];
        setNotepads(savedNotepads);
      } catch (error) {
        console.error('Error loading notepads on mount:', error);
      }
    };

    loadNotepads();
  }, []);

  const saveNotepad = async (title: string, content: string) => {
    try {
      const newNotepad = { title, content };
      const updatedNotepads: { title: string; content: string; }[] = [...notepads, newNotepad];
      setNotepads(updatedNotepads);
      localStorage.setItem('notepads', JSON.stringify(updatedNotepads));
    } catch (error) {
      console.error('Error saving notepad:', error);
    }
  };

  const deleteNotepad = (notepad: Notepad) => {
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

  return { notepads, selectedNotepad, saveNotepad, deleteNotepad, loadNotepadContent, setSelectedNotepad};
}
import './App.css'

import MainEditor from "./components/MainEditor";
import Sidebar from "./components/Sidebar";

import { useEffect, useState } from 'react';

interface Notepad {
  title: string;
  content: string;
}

export default function App() {
  const [notepads, setNotepads] = useState<Notepad[]>([]);
  const [selectedNotepad, setSelectedNotepad] = useState({ title: '', content: '' });

    // Load saved notepads on mount
  useEffect(() => {
      console.log("Loading notepads on mount.")
      const loadNotepads = () => {
        try {
          const savedNotepadsData = localStorage.getItem('notepads');
          const savedNotepads = savedNotepadsData ? JSON.parse(savedNotepadsData) : [];
          setNotepads(savedNotepads);
          
          console.log('All notepads loaded successfully:', savedNotepads);
        } catch (error) {
          console.error('Error loading notepads on mount:', error);
        }
      };
  
      loadNotepads();
    }, []);

  // Save notepads to local storage via onClick in the sidebar
  const saveNotepad = async (title: string, content: string) => {
    console.log('Saving notepad:', title, content);

    try {
      const newNotepad = { title, content };
      
      // Take notepads loaded on mount and add the new notepad
      const updatedNotepads: { title: string; content: string; }[] = [...notepads, newNotepad];
      setNotepads(updatedNotepads);

      // Save notepads in the local storage
      localStorage.setItem('notepads', JSON.stringify(updatedNotepads));

      // Get all notepads from local storage and print them
      const savedNotepadsData = localStorage.getItem('notepads');
      const savedNotepads = savedNotepadsData ? JSON.parse(savedNotepadsData) : [];
      console.log('All notepads in localStore after saving a new notepad:', savedNotepads);

    } catch (error) {
      console.error('Error saving notepad:', error);
    }
  };

  const deleteNotepad = (notepad: Notepad) => {
    console.log('Deleting notepad:', notepad.title);
  
    try {
      // Filter out the notepad with the given title
      const updatedNotepads = notepads.filter(n => n.title !== notepad.title);
      setNotepads(updatedNotepads);
  
      // Update local storage
      localStorage.setItem('notepads', JSON.stringify(updatedNotepads));
  
      // If the deleted notepad was the selected one, clear the selection
      if (selectedNotepad.title === notepad.title) {
        setSelectedNotepad({ title: '', content: '' });
      }
  
      console.log('Notepad deleted successfully:', notepad.title);
    } catch (error) {
      console.error('Error deleting notepad:', error);
    }
  };

  // Load content of a notepad onClick in a sidebar
  const loadNotepadContent = (notepad: Notepad) => {
    console.log('Loading notepad content to the main interface:', notepad);
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

  return (
    <div className="app">
      <Sidebar
        notepads={notepads}
        saveNotepad={saveNotepad}
        loadNotepadContent={loadNotepadContent}
        deleteNotepad={deleteNotepad}
        selectedNotepad={selectedNotepad}
      />
      <MainEditor selectedNotepad={selectedNotepad} setSelectedNotepad={setSelectedNotepad} />
    </div>
  );
}
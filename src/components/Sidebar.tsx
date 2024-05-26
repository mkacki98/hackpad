import { useState } from 'react';

interface Notepad
{
  title: string;
  content: string;
}

interface SidebarProps {
  notepads: Notepad[];
  saveNotepad: (title: string, content: string) => void;
  loadNotepadContent: (notepad: Notepad) => void;
  deleteNotepad:  (notepad: Notepad) => void;
  selectedNotepad: Notepad;
}

const Sidebar = ({ notepads, saveNotepad, loadNotepadContent, selectedNotepad, deleteNotepad }: SidebarProps) => {
  const [newNotepadTitle, setNewNotepadTitle] = useState('');

  const showNotepad = (notepad: Notepad) => {
    console.log("Using showNotepad.")
    loadNotepadContent(notepad);
  };

  const handleCreateNotepad = () => {
    console.log('Creating new notepad:', newNotepadTitle, "with content:", selectedNotepad.content);
    saveNotepad(newNotepadTitle, selectedNotepad.content);
    setNewNotepadTitle('');
  };

  return (
    <div>
      <input
        type="text"
        value={newNotepadTitle}
        onChange={(e) => setNewNotepadTitle(e.target.value)}
        placeholder="New Notepad Title"
      />
      <button onClick={handleCreateNotepad}>Create Notepad</button>
      {notepads.map((notepad: Notepad, index) => (
        <div
          key={index}
          onClick={() => showNotepad(notepad)}
          className="notepad-title"
        >
          {notepad.title}
        </div>
      ))}
      {selectedNotepad.title && <button onClick={() => deleteNotepad(selectedNotepad)}>Delete Selected Notepad</button>}
    </div>
  );
};


export default Sidebar;
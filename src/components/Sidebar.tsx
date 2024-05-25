import { useState } from 'react';

const Sidebar = ({ notepads, saveNotepad, loadNotepadContent }) => {
  const [newNotepadTitle, setNewNotepadTitle] = useState('');

  const showNotepad = (notepad) => {
    loadNotepadContent(notepad);
  };

  const handleCreateNotepad = () => {
    saveNotepad(newNotepadTitle, '');
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
      {notepads.map((notepad, index) => (
        <div
          key={index}
          onClick={() => showNotepad(notepad)}
          className="notepad-title"
        >
          {notepad.title}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
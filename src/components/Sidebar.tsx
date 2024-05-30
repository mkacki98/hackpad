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
  clearEditor: () => void;
  selectedNotepad: Notepad;
}

const Sidebar = ({ notepads, loadNotepadContent, selectedNotepad, deleteNotepad, clearEditor }: SidebarProps) => {
  const showNotepad = (notepad: Notepad) => {
    console.log("Using showNotepad.")
    loadNotepadContent(notepad);
  };


  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-tools">
          <button onClick={clearEditor} className="new-note">
        <img src="/public/new-note.png" alt="NewNote" className="new-note-icon" />
        </button>
        </div>
        <div className='daybook-container'>
        <div className="entries-container">
          {notepads.map((notepad: Notepad, index) => (
            <div key={index} className="entries entry-container">
              <div onClick={() => showNotepad(notepad)}>
                {notepad.title}
              </div>
              <button onClick={() => deleteNotepad(notepad)} className="no-hoover-button">
                <img src="/public/delete.svg" alt="Delete" className="delete-icon" />
              </button>
            </div>
          ))}
        </div>
        </div>
    </div>
    </div>
  );
};


export default Sidebar;
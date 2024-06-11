import SessionTimer from './../components/Timer';

interface Note
{
  id: string;
  createdAt: string;
  title: string;
  headline: string;
  content: string;
}

interface SidebarProps {
  Notes: Note[];
  loadNoteContent: (Note: Note) => void;
  deleteNote:  (Note: Note) => void;
  createNote: () => void;
}

const Sidebar = ({ Notes, loadNoteContent, deleteNote, createNote }: SidebarProps) => {
  
  const displayNewNote = (Note: Note) => {
    loadNoteContent(Note);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-tools">          
          <button onClick={createNote} className="new-note-button">
            <img src="/new-note.png" alt="NewNote" className="new-note-icon" />
          </button>
          <div className='logo'>
          <img src="/hackerpad.svg" alt="Delete" className="logo-icon" />
          <div>V0.0</div>
          </div>
        </div>
        <div className='entries-container'>
        <div className="entries">
          {Notes.length > 0 ? (
            Notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((Note: Note, index) => (
              <div key={index} className="entry" onClick={() => displayNewNote(Note)}>
                <div className="entry-content" onClick={(e) => e.stopPropagation()}>
                  {Note.title}
                </div>
                <button onClick={(e) => {e.stopPropagation(); deleteNote(Note);}} className="delete-button">
                  <img src="/delete.svg" alt="Delete" className="delete-icon" />
                </button>
              </div>
            ))
          ) : null}
        </div>
        </div>
          <SessionTimer />
      </div>
    </div>
  );
};

export default Sidebar;
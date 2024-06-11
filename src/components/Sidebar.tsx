import SessionTimer from './../components/Timer';

interface Note
{
  id: string;
  createdAt: Date;
  title:string;
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
          <img src="/hackerpad.svg" alt="Delete" className="logo-icon" />
        </div>
        <div className='entries-container'>
        <div className="entries">
            {Notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((Note: Note, index) => (
              <div key={index} className="entry" onClick={() => displayNewNote(Note)}>
                <div className="entry-content" onClick={(e) => e.stopPropagation()}>
                  {Note.title}
                </div>
                <button onClick={(e) => {e.stopPropagation(); deleteNote(Note);}} className="delete-button">
                  <img src="/delete.svg" alt="Delete" className="delete-icon" />
                </button>
              </div>
            ))}
          </div>
        </div>
          <SessionTimer />
      </div>
    </div>
  );
};

export default Sidebar;
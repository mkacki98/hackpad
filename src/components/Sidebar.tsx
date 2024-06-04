interface Note
{
  id: string;
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
        </div>
        <div className='entries-containers'>
          <div className="entries">
            {Notes.map((Note: Note, index) => (
              <div key={index} className="entry" onClick={() => displayNewNote(Note)}>
                <div className="entry-content" onClick={(e) => e.stopPropagation()}>
                  {Note.headline}
                </div>
                <button onClick={(e) => {e.stopPropagation(); deleteNote(Note);}} className="delete-button">
                  <img src="/delete.svg" alt="Delete" className="delete-icon" />
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
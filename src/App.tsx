// App.tsx
import './App.css'
import MainEditor from "./components/MainEditor";
import Sidebar from "./components/Sidebar";
import useNotepads from './hooks/useNotepads';

export default function App() {
  const { notepads, selectedNotepad, saveNotepad, deleteNotepad, loadNotepadContent, setSelectedNotepad} = useNotepads();

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
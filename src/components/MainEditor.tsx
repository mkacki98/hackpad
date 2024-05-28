import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import { useEffect } from "react";

interface Notepad {
  title: string;
  content: string;
}
interface MainEditorProps {
  selectedNotepad: Notepad;
  setSelectedNotepad: (notepad: Notepad) => void;
  saveNotepad: (title: string, content: string) => void;
}

export default function MainEditor({ selectedNotepad, setSelectedNotepad, saveNotepad}: MainEditorProps) {
  
  // If text is changed in the editor, update the selectedNotepad content
  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,
  
    onUpdate: () => {
      let newContent = editor?.getHTML() || "";
      if (!newContent.startsWith('<h2>')) {
        newContent = `<h2>${selectedNotepad.title}</h2>` + newContent;
      }
      setSelectedNotepad({
        title: selectedNotepad.title,
        content: newContent
      });
      saveNotepad(selectedNotepad.title, newContent);
    },
  });

  // When editor changes (new text is being written); 
  // or Sidebar sets a new notepad, set the content in the editor
  useEffect(() => {
    console.log("Setting content in editor.");
    if (selectedNotepad !== null && selectedNotepad !== undefined) {
      // If some notepad is selected, set its content in the editor
      editor?.commands.setContent(selectedNotepad.content, false, { preserveWhitespace: "full" });
    } else {
      editor?.commands.setContent(`<h2>${new Date().toLocaleString()}</h2>`);
    }
  }, [selectedNotepad]);

  return (
    <div className="main-editor">
      {editor ? <Menubar editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
}
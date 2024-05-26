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
}

export default function MainEditor({ selectedNotepad, setSelectedNotepad }: MainEditorProps) {
  
  // If text is changed in the editor, update the selectedNotepad content
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<h2>Here's some text</h2>`,
    onUpdate: () => {
      setSelectedNotepad({
        title: selectedNotepad.title,
        content: editor?.getHTML() || "",
      });
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
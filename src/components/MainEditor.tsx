import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import { useEffect } from "react";

interface Note {
  id: string;
  headline: string;
  content: string;
}

interface MainEditorProps {
  displayedNote: Note;
  saveNote: (id: string, headline: string, content: string) => void;
}

export default function MainEditor({ displayedNote, saveNote}: MainEditorProps) {
  

  const headlineEditor = useEditor({
    extensions: [StarterKit],
    content: '',

    onUpdate: () => {
      let newTitle = headlineEditor?.getHTML();
      if (newTitle !== undefined) {
        console.log("New title to save: ", newTitle, "Old title: ", displayedNote.headline);
        newTitle = newTitle.replace(/<\/?p>/g, '');
        console.log("New title to save: ", newTitle, "Old title: ", displayedNote.headline);
        saveNote(displayedNote.id, newTitle, displayedNote.content);
      }
    }
  })

  const editor = useEditor({
    extensions: [StarterKit],
    content: ``,

    onUpdate: () => {
      let newContent = editor?.getHTML();
      if (newContent !== undefined) {
        console.log("New content to save: ", newContent, "Old content: ", displayedNote.content);
        saveNote(displayedNote.id, displayedNote.headline, newContent);
      }
    },
  });

  
  useEffect(() => {
    console.log("usingEffect in MainEditor")
    if (displayedNote) {
      headlineEditor?.commands.setContent(displayedNote.headline);
      editor?.commands.setContent(displayedNote.content);
    } else {
      headlineEditor?.commands.setContent("This is where the headline of the note goes.", false, { preserveWhitespace: "full" });
      editor?.commands.setContent("Create a new note with a button on the sidebar.", false, { preserveWhitespace: "full" });
    }
  }, [displayedNote, headlineEditor, editor]);

  return (
    <div className="main-editor">
      {editor ? <Menubar editor={editor} /> : null}
      <div className="headline-editor">
        <EditorContent editor={headlineEditor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
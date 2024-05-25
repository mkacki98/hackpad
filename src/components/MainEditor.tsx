import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import { useEffect } from "react";

interface NotepadContent {
  title: string;
  text: string;
}

interface MainEditorProps {
  notepadContent: NotepadContent;
}

export default function MainEditor({ notepadContent }: MainEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `<h2>Starting kit</h2>`,
  });

  useEffect(() => {
    if (notepadContent) {
      editor?.commands.setContent(notepadContent);
    }
  }, [notepadContent, editor]);

  return (
    <div className="main-editor">
      {editor ? <Menubar editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  );
}
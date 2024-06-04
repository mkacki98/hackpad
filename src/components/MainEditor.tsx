import {  EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'


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
        //newTitle = newTitle.replace(/<\/?p>/g, '');
        let cleanedTitle = newTitle.replace(/<[^>]*>/g, '');
        saveNote(displayedNote.id, cleanedTitle, displayedNote.content);
      }
    }
  })

  const editor = useEditor({
    extensions: [StarterKit,
      TaskList,
      TaskItem,
      ],
    content: ``,

    onUpdate: () => {
      let newContent = editor?.getHTML();
      if (newContent !== undefined) {
        console.log(newContent)
        saveNote(displayedNote.id, displayedNote.headline, newContent);
      }
    },
  });

  
  useEffect(() => {
    if (displayedNote) {
      let wrappedHeadline = `<h1>${displayedNote.headline}</h1>`;
      headlineEditor?.commands.setContent(wrappedHeadline);
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
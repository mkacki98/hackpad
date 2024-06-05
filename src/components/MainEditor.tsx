import {  EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Confetti from "react-dom-confetti";

import Menubar from "./Menubar";
import { useEffect, useState } from "react";


interface Note {
  id: string;
  headline: string;
  content: string;
}


interface MainEditorProps {
  displayedNote: Note | null;
  saveNote: (id: string, headline: string, content: string) => void;
}

export default function MainEditor({ displayedNote, saveNote}: MainEditorProps) {

  const [confetti, setConfetti] = useState(false);
  
  const headlineEditor = useEditor({
    extensions: [StarterKit],
    content: '',

    onUpdate: () => {
      let newTitle = headlineEditor?.getHTML();
      if (newTitle !== undefined) {
        //newTitle = newTitle.replace(/<\/?p>/g, '');
        if (displayedNote) {
          let cleanedTitle = newTitle.replace(/<[^>]*>/g, '');
          saveNote(displayedNote.id, cleanedTitle, displayedNote.content);
        }
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
        if (displayedNote) {
          saveNote(displayedNote.id, displayedNote.headline, newContent);
          if (newContent.includes('<input type="checkbox" checked="checked">')) {
            setConfetti(true);
  
            setTimeout(() => setConfetti(false), 2000);
        }
      }}}
    });


  
  useEffect(() => {
    if (displayedNote) {
      let wrappedHeadline = `<h1>${displayedNote.headline}</h1>`;

      headlineEditor?.commands.setContent(wrappedHeadline);
      editor?.commands.setContent(displayedNote.content);
    } else {
      headlineEditor?.commands.setContent("", false, { preserveWhitespace: "full" });
      editor?.commands.setContent("", false, { preserveWhitespace: "full" });
    }
  }, [displayedNote, headlineEditor, editor]);

  return (
    <div className="main-editor">
      {editor ? <Menubar editor={editor} /> : null}
      <div className="headline-editor">
        <EditorContent editor={headlineEditor} />
      </div>
      <EditorContent editor={editor} />
      <Confetti active={confetti} />
    </div>
  );
}
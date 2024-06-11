import {  EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Confetti from "react-dom-confetti";

import Menubar from "./Menubar";
import { useEffect, useState } from "react";


interface Note {
  id: string;
  createdAt: string,
  title: string;
  headline: string;
  content: string;
}


interface MainEditorProps {
  displayedNote: Note | null;
  saveNote: (id: string, createdAt: string, title: string, headline: string, content: string) => void;
}

export default function MainEditor({ displayedNote, saveNote}: MainEditorProps) {

  const [confetti, setConfetti] = useState(false);
  const [checkedCount, setCheckedCount] = useState(0);

  const headlineEditor = useEditor({
    extensions: [StarterKit],
    content: '',

    onUpdate: () => {
      let newHeadline = headlineEditor?.getHTML();
      if (newHeadline !== undefined) {
        //newTitle = newTitle.replace(/<\/?p>/g, '');
        if (displayedNote) {
          let cleanedHeadline = newHeadline.replace(/<[^>]*>/g, '');
          saveNote(displayedNote.id, displayedNote.createdAt, displayedNote.title, cleanedHeadline, displayedNote.content);
        }
      }
    }
  })



  const editor = useEditor({
    extensions: [StarterKit, TaskList, TaskItem],
    content: ``,

    onUpdate: () => {
      let newContent = editor?.getHTML();
      if (newContent !== undefined) {
        if (displayedNote) {
          saveNote(displayedNote.id, displayedNote.createdAt, displayedNote.title, displayedNote.headline, newContent);
          let newCheckedCount = (newContent.match(/<input type="checkbox" checked="checked">/g) || []).length;
          if (newCheckedCount > checkedCount) {
            setConfetti(true);
            setTimeout(() => setConfetti(false), 100);
          }
          setCheckedCount(newCheckedCount);
        }
      }
    }
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
import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';

const TextEditor: React.FC<any> = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState<string | undefined>('');

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div ref={ref}>
        <MDEditor
          value={input}
          onChange={(text: string | undefined) => setInput(text)}
        />
      </div>
    );
  } else {
    return (
      <div onClick={() => setEditing(true)}>
        <MDEditor.Markdown source="# hi" />
      </div>
    );
  }
};

export default TextEditor;

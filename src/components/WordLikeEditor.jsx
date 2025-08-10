import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DOMPurify from "dompurify"; 
import { useRef, useEffect } from 'react';

export default function WordLikeEditor({data, setContent, trigger}) {
  const initialValue = useRef(data);
  const editorRef = useRef(null);

  // Reset editor when trigger changes (used in Add page)
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setData(""); // Clear the editor
    }
  }, [trigger]);

  // Update editor content when `data` changes (used in Edit page)
  useEffect(() => {
    if (editorRef.current && data !== undefined) {
      editorRef.current.setData(data);
    }
  }, [data]);


  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={initialValue.current}
        config={{
          toolbar: ['bold', 'italic', 'underline', 'bulletedList', 'numberedList', 'undo', 'redo'],
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          const plainText = DOMPurify.sanitize(data, { ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'u', 'ul', 'ol', 'li', 'p', 'br'] }); //Remove Html tags
          setContent(plainText)
        }}
      />
    </div>
  );
}

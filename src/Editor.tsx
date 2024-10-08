import { $getRoot, EditorState } from "lexical";
import { OnChangePlugin } from "lexical-solid/LexicalOnChangePlugin";
import { HistoryPlugin } from "lexical-solid/LexicalHistoryPlugin";
import { PlainTextPlugin } from "lexical-solid/LexicalPlainTextPlugin";
import { ContentEditable } from "lexical-solid/LexicalContentEditable";
import { LexicalComposer } from "lexical-solid/LexicalComposer";
import { useLexicalComposerContext } from "lexical-solid/LexicalComposerContext";
import { AutoFocusPlugin } from "lexical-solid/LexicalAutoFocusPlugin";
import { createSignal } from "solid-js";

export function MyEditor() {
  return (
    <LexicalComposer
      initialConfig={{
        // The editor theme
        theme: {},
        namespace: "test",
        // Handling of errors during update
        onError(error: any) {
          console.error(error);
          throw error;
        },
      }}
    >
      <EditorImplementation />
    </LexicalComposer>
  );
}

function EditorImplementation() {
  const [editor] = useLexicalComposerContext();
  const [editorContent, setEditorContent] = createSignal<string>("");
  const [debugLog, setDebugLog] = createSignal<string[]>([]);

  const addToDebugLog = (message: string) => {
    setDebugLog((prev) => [...prev, message]);
    console.log(message);
  };

  const printEditorContent = () => {
    editor.getEditorState().read(() => {
      const root = $getRoot();
      const content = root.getTextContent();
      setEditorContent(content);
      addToDebugLog(`Editor content: "${content}"`);
    });
  };

  const onEditorChange = (editorState: EditorState) => {
    editorState.read(() => {
      console.log("onChange");
      const root = $getRoot();
      const content = root.getTextContent();
      setEditorContent(content);
      addToDebugLog(`Editor state changed. Content: "${content}"`);
    });
  };

  return (
    <div>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text above...</div>}
        errorBoundary={(error) => {
          addToDebugLog(`ErrorBoundary: ${error.toString()}`);
          return <div>Error: {error.toString()}</div>;
        }}
      />
      <HistoryPlugin delay={300} />
      <OnChangePlugin onChange={onEditorChange} />
      <AutoFocusPlugin />
      <button onClick={printEditorContent}>Print Editor Content</button>
      <div>
        <h3>Current Editor Content:</h3>
        <pre>{editorContent()}</pre>
      </div>
      <div>
        <h3>Debug Log:</h3>
        <ul>
          {debugLog().map((log) => (
            <li>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

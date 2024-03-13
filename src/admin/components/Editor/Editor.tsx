import React, {useEffect} from 'react';

import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";


import './Editor.css';
import exampleTheme from "./theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import {$createParagraphNode, $getRoot} from "lexical";
function Placeholder() {
    return <div className="editor-placeholder">Унесите остале детаље о празнику  (<i>нпр. 17:00 - Додела пакетића после литургије, 18:00 - Паљење бадњака итд.</i>)</div>;
}
// Inside the `editor.update` you can use special $ prefixed helper functions.
// These functions cannot be used outside the closure, and will error if you try.
// (If you're familiar with React, you can imagine these to be a bit like using a hook
// outside of a React function component).


const editorConfig = {
    // The editor theme
    namespace: "editor",
    theme: exampleTheme,
    // Handling of errors during update
    onError(error: any) {
        console.log(error);
    },
    // Any custom nodes go here
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode
    ]
};

interface EditorProps {
    placeholder?: React.JSX.Element;
    setContent: (content: string) => void;
    defaultContent?: string;
}
export default function Editor({setContent, defaultContent, placeholder}: EditorProps) {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <EditorContent setContent={setContent} defaultContent={defaultContent} placeholder={placeholder}/>
        </LexicalComposer>
    );
}

function EditorContent({setContent, defaultContent, placeholder}: EditorProps) {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
        if(defaultContent) {
            editor.update(() => {
                // In the browser you can use the native DOMParser API to parse the HTML string.
                const parser = new DOMParser();
                const dom = parser.parseFromString(defaultContent, "text/html");

                // Once you have the DOM instance it's easy to generate LexicalNodes.
                const nodes = $generateNodesFromDOM(editor, dom);

                // Select the root
                const root = $getRoot()
                const paragraphNode = $createParagraphNode();
                nodes.forEach((n)=> paragraphNode.append(n))
                root.append(paragraphNode);
            });
        }
    }, []);
    return (
        <div className="editor-container" onKeyUp={() => setContent(editor.getRootElement()?.innerHTML as string)}>
            <ToolbarPlugin/>
            <div className="editor-inner">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input"  />}
                    placeholder={placeholder || <Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin/>
                <AutoFocusPlugin/>
                <ListPlugin/>
                <LinkPlugin/>
                <ListMaxIndentLevelPlugin maxDepth={7}/>
                <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
            </div>
        </div>
    );
}
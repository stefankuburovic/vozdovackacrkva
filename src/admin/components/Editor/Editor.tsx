import React, {useEffect, useRef, useState} from 'react';

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
function Placeholder() {
    return <div className="editor-placeholder">Унесите остале детаље о празнику  (<i>нпр. 17:00 - Додела пакетића после литургије, 18:00 - Паљење бадњака итд.</i>)</div>;
}

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
    setContent: (content: string) => void;
}
export default function Editor({setContent}: EditorProps) {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <EditorContent setContent={setContent} />
        </LexicalComposer>
    );
}

function EditorContent({setContent}: EditorProps) {
    const [editor] = useLexicalComposerContext();
    return (
        <div className="editor-container" onKeyUp={() => setContent(editor.getRootElement()?.innerHTML as string)}>
            <ToolbarPlugin/>
            <div className="editor-inner">
                <RichTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    placeholder={<Placeholder/>}
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
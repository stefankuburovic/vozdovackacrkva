import React, { useCallback } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement } from "@lexical/utils";
import { Button } from '@mui/material';
import { styled } from '@mui/system';
import {UploadFile} from "@mui/icons-material";
import {$createParagraphNode, $insertNodes, $isRootOrShadowRoot} from "lexical";
import {$createImageNode} from "../nodes/ImageNode";

const Input = styled('input')({
    display: 'none',
});

const ImageUploadPlugin: React.FC = () => {
    const [editor] = useLexicalComposerContext();

    const handleImageUpload = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    const url = reader.result as string;
                    console.log(url);
                    // editor.update(() => {
                    //     const imageNode = $createImageNode({
                    //         altText: file.name,
                    //         src: url,
                    //         width: 100,
                    //         height: 100,
                    //     });
                    //     $insertNodes([imageNode]);
                    //     if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                    //         $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
                    //     }
                    // });
                };
                reader.readAsDataURL(file);
            }
        },
        [editor]
    );

    return (
        <label htmlFor="image-upload">
            <Input
                accept="image/*"
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
            />
            <Button
                variant="text"
                component="i"
                color="inherit" startIcon={
                <UploadFile />
            } />
        </label>
    );
};

export default ImageUploadPlugin;

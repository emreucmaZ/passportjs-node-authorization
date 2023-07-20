import React, { useMemo } from "react";
import { imageUpload } from "../pages/menus/modals/functions/imageUpload";
import { ITextAreaComponentProps } from "../pages/menus/modals/interfaces/ITextAreaComponentProps";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

function TextAreaComponent({ formik, editor, state }: ITextAreaComponentProps) {
  return useMemo(() => {
    return (
      <>
        <JoditEditor
          className="mt-4"
          ref={editor}
          value={formik.values.content}
          onChange={(value: string) => formik.setFieldValue("content", value)}
          config={{
            readonly: false,
            disablePlugins: ["paste"],
            tabIndex: 1,
            defaultActionOnPaste: "insert_clear_html",
            toolbarButtonSize: "large",
            buttons: [
              "source",
              "|",
              "bold",
              "italic",
              "|",
              "ul",
              "ol",
              "|",
              "font",
              "fontsize",
              "brush",
              "paragraph",
              "|",
              "video",
              "table",
              "link",
              "|",
              "left",
              "center",
              "right",
              "justify",
              "|",
              "undo",
              "redo",
              "|",
              "hr",
              "eraser",
              "fullsize",
            ],
            extraButtons: [
              {
                name: "Insert Image",
                tooltip: "Insert An Image",
                iconURL:
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png",
                exec: (editor: any) => {
                  imageUpload(editor, state);
                },
              },
            ],
          }}
        />
      </>
    );
  }, []);
}

export default TextAreaComponent;

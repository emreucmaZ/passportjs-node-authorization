export const insertImage = (editor: any, url: string) => {
    
  if (editor) {
    const image = editor.selection.j.createInside.element("img");
    image.setAttribute("src", url);
    editor.selection.insertNode(image);
  }
};

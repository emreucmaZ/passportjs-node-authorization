import { REQUEST_URL } from "@/variables";
import { insertImage } from "./insertImage";
import { uploadImageToContent } from "./uploadImageToContent";
import { IRootState } from "@/redux/interfaces/IRootState";

export const imageUpload = (editor: any,state:IRootState) => {
    const input = document.createElement("input") as HTMLInputElement;
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async function () {
      if (input && input.files && input.files.length > 0) {
        const imageFile = input.files[0];

        if (!imageFile) {
          return;
        }

        if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
          return;
        }

        insertImage(
          editor,
          `${REQUEST_URL}/public/images/${await uploadImageToContent(
            imageFile,
            state
          )}`
        );
      } else {
        console.error("Dosya seçilmedi.");
      }
    };
  };
import { IRootState } from "@/redux/interfaces/IRootState";
import { REQUEST_URL } from "@/variables";
import axios from "axios";

export async function uploadImageToContent(imageFile: File, state: IRootState) {
  try {
    const response = await axios.post(
      `${REQUEST_URL}/images`,
      {
        image: imageFile,
        title: imageFile.name,
      },
      {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.image.url;
  } catch (error) {
    console.error(error);
    return null; // Hata durumunda null ya da başka bir hata durum değeri dönebilirsiniz.
  }
}

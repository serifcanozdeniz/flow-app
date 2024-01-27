import axios from "axios";

// resmi buluta yükler ve url ini döndürür
export const upload = async (file) => {
  // form verisini belirle

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "flowww");

  // buluta resmi yükle
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dyoywo6l4/image/upload",
    data
  );

  //   resmin url ini döndür
  return res.data.url;
};

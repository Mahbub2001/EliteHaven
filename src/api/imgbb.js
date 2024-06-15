export const uploadToImageBB = async (imageFile) => {
    const apiKey = "34ef744f3065352f950f2d56538afc4f"; 
    const formData = new FormData();
    formData.append("image", imageFile);
  
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
  
    const result = await response.json();
    return result.data.url;
  };
  
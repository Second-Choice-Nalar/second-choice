// components/ImageUpload.js
import { useState } from "react";

export default function ImageUpload({ onImageUpload }) {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    images.forEach((img) => {
      formData.append("images", img.file); // Menambahkan gambar ke form data
    });

    // Kirim data gambar ke API untuk di-upload ke Supabase
    const response = await fetch("/api/product", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Images uploaded and product created!");
    } else {
      console.log("Error uploading images.");
    }
  };

  return (
    <div>
      <button onClick={handleUploadClick}>Upload Image</button>
      <input
        type="file"
        id="fileInput"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />
      <div>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img.url} alt={`preview-${index}`} width="100" />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Save Product</button>
    </div>
  );
}

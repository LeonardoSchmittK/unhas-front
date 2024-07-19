import React, { useEffect, useRef, useState } from "react";

function CreateNails() {
  const inputImage = useRef(null);
  const [images, setImages] = useState([]);

  async function uploadImage(event) {
    event.preventDefault(); // Prevent the form from submitting
    const formData = new FormData();
    const file = inputImage.current.files[0];
    formData.append("image", file);

    try {
      const response = await fetch("https://unhas.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("File uploaded successfully:", data);
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("https://unhas.onrender.com/images");
        if (response.ok) {
          const data = await response.json();
          setImages(data.data); // Adjust based on your API response structure
        } else {
          console.error("Error fetching images:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div>
      <form
        id="uploadForm"
        encType="multipart/form-data"
        onSubmit={uploadImage} // Pass the event handler directly
      >
        <input
          ref={inputImage}
          type="file"
          id="imageInput"
          name="image"
          className="oi"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-400 rounded"
        >
          Upload
        </button>
      </form>
      <div className="image-gallery">
        {images.map((image) => (
          <img
            key={image.name}
            src={`https://unhas.onrender.com/images/${image.name}`}
            alt={image.name}
            className="gallery-image"
          />
        ))}
      </div>
    </div>
  );
}

export default CreateNails;

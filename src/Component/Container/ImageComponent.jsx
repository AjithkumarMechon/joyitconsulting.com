import React, { useState } from "react";
import "./product.css";

export default function ImageComponent({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="image_head">
      <div>
        <img
          className="image_screen"
          src={images[selectedImageIndex]}
          alt={`Selected Image`}
          style={{ marginTop: "10px", width: "20rem", height: "20rem" }}
        />
      </div>
      <div className="image_thumbnail">
        {images.map((imageUrl, index) => (
          <img
            className="lazy-loading"
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            onClick={() => handleThumbnailClick(index)}
            style={{
              border: index === selectedImageIndex ? "2px solid blue" : "none",
              cursor: "pointer",
              marginRight: "10px",
              width: "3rem",
              height: "3rem",
            }}
          />
        ))}
      </div>
    </div>
  );
}

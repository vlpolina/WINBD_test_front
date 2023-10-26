import React from "react";
import "./articleBody.scss";
import { Typography } from "@material-ui/core";

//предпросмотр статьи при ее редактировании в реальном времени (правая часть страницы редактирования)
const ArticleBody = ({
  image,
  title,
  quote,
  author,
  content,
  selectedFile,
}) => {
  return (
    <>
      {image != null &&
        image.map((image, index) => (
          <img className="image" key={index} src={image} alt="image" />
        ))}
      <Typography variant="h5">{title}</Typography>
      <blockquote className="quote">
        <p className="quote__body">{quote}</p>
        <footer className="quote__footer">{author}</footer>
      </blockquote>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <br />
      <Typography>Скачать вложения к статье ниже:</Typography>
      {selectedFile != null &&
        selectedFile.map((file, index) => (
          <a className="file" key={index} download>
            Вложение {index + 1} {} <br />
          </a>
        ))}
    </>
  );
};

export default ArticleBody;

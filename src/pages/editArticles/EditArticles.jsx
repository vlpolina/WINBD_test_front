import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import ArticleBody from "../../components/articleBody/ArticleBody";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Typography,
  Button,
  TextField,
  Grid,
  ButtonGroup,
} from "@material-ui/core";

//страница редактирования статьи
const EditArticles = (data) => {
  //состояния для хранения и отображения данных при редактировании
  const [title, setTitle] = useState("Название статьи");
  const [quote, setQuote] = useState("Текст цитаты");
  const [author, setAuthor] = useState("Автор цитаты");
  const [content, setContent] = useState("Текст статьи");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [er, setError] = useState();
  const [article, setArticle] = useState([]);

  //получение ID открытой статьи из url- адреса для получения других ее данных
  const location = useLocation();
  const searchID = new URLSearchParams(location.search);
  const articleID = searchID.get("id");

  //получение данных статьи
  const getData = async () => {
    const docRef = doc(db, "articles", articleID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setArticle(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getData();
  }, [articleID]);

  useEffect(() => {
    setTitle(article.title || "");
    setQuote(article.quote || "");
    setAuthor(article.author || "");
    setContent(article.content || "");
    setSelectedImage(article.selectedImage || null);
    setFile(article.selectedFile || null);
  }, [article]);

  //функция для загрузки изображений
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadedFiles.push(reader.result);
        if (uploadedFiles.length === files.length) {
          setSelectedImage(uploadedFiles);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //функция для форматирования выделенного курсором текста в textarea
  const changeText = (param) => {
    const textarea = document.getElementById("textarea");
    const start = textarea.value.substring(0, textarea.selectionStart);
    const end = textarea.value.substring(textarea.selectionEnd);
    const selected = textarea.value.substring(
      textarea.selectionStart,
      textarea.selectionEnd
    );
    const regex = /<[^>]+>/g;
    let updatedSelected;
    if (param === "bold") {
      updatedSelected = `<b>${selected}</b>`;
    }
    if (param === "italic") {
      updatedSelected = `<i>${selected}</i>`;
    }
    if (param === "mark") {
      updatedSelected = `<mark>${selected}</mark>`;
    }
    if (param === "normal") {
      updatedSelected = selected.replace(regex, "");
    }
    const updatedContent = start + updatedSelected + end;
    setContent(updatedContent);
  };

  //функция для загрузки иных файлов
  const handleFileUpload = (event) => {
    const files = event.target.files;
    const uploadedFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        uploadedFiles.push(reader.result);
        if (uploadedFiles.length === files.length) {
          setFile(uploadedFiles);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  //функция для отправки отредактированных данных на сервер
  const sendData = async () => {
    const articleRef = doc(db, "articles", articleID);
    setIsSending(true);
    try {
      await updateDoc(articleRef, {
        title: title,
        quote: quote,
        author: author,
        content: content,
        selectedImage: selectedImage,
        selectedFile: selectedFile,
      });
      console.log("Document updated");
      setError("Данные обновлены!");
    } catch (error) {
      setError("Упс, картинка слишком большая, не удалось обновить данные...");
      console.error("Error updating document: ", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Header />
      {article && Object.keys(article).length > 0 && (
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={2}
        >
          <Grid item md={5} className="articleEdit">
            <Typography variant="h5">
              Редактируйте содержимое статьи здесь
            </Typography>
            <br />
            <Typography>
              Выберите изображения к статье (можно несколько):
            </Typography>
            <input
              type="file"
              onChange={handleImageUpload}
              multiple
              accept="image/*"
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Название статьи"
              variant="outlined"
              value={title || ""}
              onChange={(event) => setTitle(event.target.value)}
              fullWidth
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Цитата к статье"
              variant="outlined"
              value={quote || ""}
              onChange={(event) => setQuote(event.target.value)}
              fullWidth
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Автор цитаты"
              variant="outlined"
              value={author || ""}
              onChange={(event) => setAuthor(event.target.value)}
              fullWidth
            />
            <br />
            <br />
            <Typography>Текст статьи</Typography>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => changeText("bold")}>Жирный</Button>
              <Button onClick={() => changeText("italic")}>Курсив</Button>
              <Button onClick={() => changeText("mark")}>
                Выделить желтым
              </Button>
              <Button onClick={() => changeText("normal")}>
                Отменить форматирование
              </Button>
            </ButtonGroup>
            <Typography>
              *Чтобы отменить форматирование, выделите текст вместе с тегами
            </Typography>
            <br />
            <textarea
              id="textarea"
              value={content || ""}
              onChange={(event) => setContent(event.target.value)}
              rows="10"
              cols="60"
            />
            <br />
            <Typography>Добавьте файлы к статье при необходмости:</Typography>
            <input type="file" onChange={handleFileUpload} multiple />
            <br />
            <br />
            <Button
              variant={"outlined"}
              onClick={sendData}
              disabled={isSending}
            >
              {" "}
              {isSending ? "Отправка..." : "Сохранить изменения"}
            </Button>
            <br />
            <Typography>{er}</Typography>
            <br />
            <Link to="/articles">На главную</Link>
          </Grid>
          <Grid item md={5} className="articleBody">
            <ArticleBody
              image={selectedImage}
              title={title}
              quote={quote}
              author={author}
              content={content}
              selectedFile={selectedFile}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default EditArticles;

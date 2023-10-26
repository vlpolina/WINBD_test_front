import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import ArticlePreview from "../../components/articlePreview/ArticlePreview";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Grid } from "@material-ui/core";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setArticles(data);
    } catch (error) {
      console.error("Error gettng document: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        className="articles-grid"
      >
        {articles.map((article, index) => (
          <Grid item md={3} key={index}>
            <ArticlePreview article={article} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Articles;

import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, Typography } from "@material-ui/core";

const ArticlePreview = ({ article }) => {
  const data = { id: article.id };
  const dataID = new URLSearchParams(data).toString();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{article.title}</Typography>
        <Typography>
          <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/edit-articles?${dataID}`}>Редактировать</Link>
      </CardActions>
    </Card>
  );
};

export default ArticlePreview;

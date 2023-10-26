import React from "react";
import Articles from "./pages/articles/Articles";
import EditArticles from "./pages/editArticles/EditArticles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/edit-articles" element={<EditArticles />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

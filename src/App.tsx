import { Route, Routes } from "react-router";
import AddFeedView from "./views/AddFeedView";
import ArticleListView from "./views/ArticlesListView";
import SingleArticleView from "./views/SingleArticleView";

const App = () => {
  return (
    <div className="layout">
      <Routes>
        <Route path="/" element={<ArticleListView />} />
        <Route path="/feed/:id" element={<ArticleListView />} />
        <Route path="/article/:feedId/:articleId" element={<SingleArticleView />} />
        <Route path="/add-feed" element={<AddFeedView />} />
        <Route path="/edit-feed/:id" element={<AddFeedView />} />
      </Routes>
    </div>
  );
};

export default App;

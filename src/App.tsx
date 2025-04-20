import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { storage } from "./utils/storage";
import AddFeedView from "./views/AddFeedView";
import ArticleListView from "./views/ArticlesListView";
import SingleArticleView from "./views/SingleArticleView";

const App = () => {
  useEffect(() => {
    storage.saveFeed({
      id: "testid1",
      name: "Nazwa feeda 1",
      url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
    });

    storage.saveFeed({
      id: "testid2",
      name: "Nazwa feeda 2",
      url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    });
  }, []);

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

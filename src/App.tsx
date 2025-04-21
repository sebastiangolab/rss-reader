import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import ArticleListView from "./views/ArticlesListView";
import SingleArticleView from "./views/SingleArticleView";
import EditFeedFormView from "./views/EditFeedFormView";
import AddFeedFormView from "./views/AddFeedFormView";
import { useFeeds } from "./hooks/useFeeds";
import ArticlesFiltersContextProvider from "./providers/ArticlesFiltersContextProvider";
import NotFoundView from "./views/NotFoundView";

const App = () => {
  const { feeds, addFeed, removeFeed, editFeed } = useFeeds();

  return (
    <ArticlesFiltersContextProvider>
      <Layout>
        <Navigation feeds={feeds} handleRemoveFeed={removeFeed} />

        <Routes>
          <Route path="/" element={<ArticleListView feeds={feeds} />} />
          <Route path="/feed/:id" element={<ArticleListView feeds={feeds} />} />
          <Route path="/article/:feedId/:articleSlug" element={<SingleArticleView />} />
          <Route path="/add-feed" element={<AddFeedFormView handleAddFeed={addFeed} />} />
          <Route
            path="/edit-feed/:id"
            element={<EditFeedFormView feeds={feeds} handleEditFeed={editFeed} />}
          />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Layout>
    </ArticlesFiltersContextProvider>
  );
};

export default App;

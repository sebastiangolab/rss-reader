import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import { Feed } from "./types";
import { storage } from "./utils/storage";
import ArticleListView from "./views/ArticlesListView";
import SingleArticleView from "./views/SingleArticleView";
import EditFeedFormView from "./views/EditFeedFormView";
import AddFeedFormView from "./views/AddFeedFormView";

const App = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const addFeed = (newFeed: Feed): void => {
    setFeeds((prevFeeds) => [...prevFeeds, newFeed]);
  };

  const removeFeed = (id: string): void => {
    const filteredFeeds = feeds.filter((feed) => feed.id !== id);

    setFeeds(filteredFeeds);
  };

  const editFeed = (updatedFeed: Feed): void => {
    const updatedFeeds = feeds.map((feed) => {
      if (feed.id === updatedFeed.id) {
        return updatedFeed;
      }

      return feed;
    });

    setFeeds(updatedFeeds);
  };

  useEffect(() => {
    const storageFeeds = storage.getFeeds();

    if (storageFeeds.length > 0) {
      setFeeds(storage.getFeeds());
    }
  }, []);

  useEffect(() => {
    storage.saveFeeds(feeds);
  }, [feeds]);

  return (
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
      </Routes>
    </Layout>
  );
};

export default App;

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import { Feed } from "./types";
import { storage } from "./utils/storage";
import AddFeedView from "./views/AddFeedView";
import ArticleListView from "./views/ArticlesListView";
import SingleArticleView from "./views/SingleArticleView";

const App = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const addFeed = (newFeed: Feed): void => {
    setFeeds(prevFeeds => [...prevFeeds, newFeed]);
  }

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
    storage.saveFeeds(feeds);
  }, [feeds]);

  useEffect(() => {
    setFeeds([
      {
        id: "testid1",
        name: "Nazwa feeda 1",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
      },
      {
        id: "testid2",
        name: "Nazwa feeda 2",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
      },
    ]);

    // setFeeds(storage.getFeeds());
  }, []);

  return (
    <Layout>
      <Navigation feeds={feeds} handleRemoveFeed={removeFeed} />

      <Routes>
        <Route path="/" element={<ArticleListView feeds={feeds} />} />
        <Route path="/feed/:id" element={<ArticleListView feeds={feeds} />} />
        <Route path="/article/:feedId/:articleId" element={<SingleArticleView />} />
        <Route path="/add-feed" element={<AddFeedView />} />
        <Route path="/edit-feed/:id" element={<AddFeedView />} />
      </Routes>
    </Layout>
  );
};

export default App;

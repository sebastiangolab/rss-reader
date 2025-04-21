import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Feed } from "../types";
import { storage } from "../utils/storage";

type feedsHookResults = {
  feeds: Feed[];
  setFeeds: Dispatch<SetStateAction<Feed[]>>;
  addFeed: (newFeed: Feed) => void;
  removeFeed: (id: string) => void;
  editFeed: (updatedFeed: Feed) => void;
};

export const useFeeds = (): feedsHookResults => {
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

  return {
    feeds,
    setFeeds,
    addFeed,
    removeFeed,
    editFeed,
  };
};

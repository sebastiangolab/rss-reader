import { Feed } from "../types";

enum StorageVariables {
  FEEDS = "feeds",
  FAVORITE_ARTICLES_IDS = "favorite_articles_ids",
  READED_ARTICLES_IDS = "readed_articles_ids",
}

const getFeeds = (): Feed[] => {
  return JSON.parse(localStorage.getItem(StorageVariables.FEEDS) || "[]");
};

const saveFeeds = (feeds: Feed[]): void => {
  localStorage.setItem(StorageVariables.FEEDS, JSON.stringify(feeds));
};

const getFavoriteArticlesIds = (): string[] => {
  return JSON.parse(localStorage.getItem(StorageVariables.FAVORITE_ARTICLES_IDS) || "[]");
};

const saveFavoriteArticlesIds = (articlesIds: string[]): void => {
  localStorage.setItem(StorageVariables.FAVORITE_ARTICLES_IDS, JSON.stringify(articlesIds));
};

const getReadedArticlesIds = (): string[] => {
  return JSON.parse(localStorage.getItem(StorageVariables.READED_ARTICLES_IDS) || "[]");
};

const saveReadedArticlesIds = (articlesIds: string[]): void => {
  localStorage.setItem(StorageVariables.READED_ARTICLES_IDS, JSON.stringify(articlesIds));
};

export const storage = {
  getFeeds,
  saveFeeds,
  getFavoriteArticlesIds,
  saveFavoriteArticlesIds,
  getReadedArticlesIds,
  saveReadedArticlesIds,
};

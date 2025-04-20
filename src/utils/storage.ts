import { Feed } from "../types";

enum StorageVariables {
  FEEDS = "feeds",
  FAVORITE_ARTICLES_IDS = "favorite_articles_ids",
  READED_ARTICLES_IDS = "readed_articles_ids",
}

const getFeeds = (): Feed[] => {
  return JSON.parse(localStorage.getItem(StorageVariables.FEEDS) || "[]");
};

const saveFeed = (newFeed: Feed): void => {
    const prevFeeds = getFeeds();

    const isFeedExistedInStorage =  prevFeeds.some(prevFeed => prevFeed.id === newFeed.id);

    if (!isFeedExistedInStorage) {
        localStorage.setItem(StorageVariables.FEEDS, JSON.stringify([...prevFeeds, newFeed]));
    }
}

const getFavoriteArticlesIds = (): string[] => {
    return JSON.parse(localStorage.getItem(StorageVariables.FAVORITE_ARTICLES_IDS) || "[]");
}

const saveFavoriteArticleId = (id: string): void => {
    const prevFavoriteArticlesIds = getFavoriteArticlesIds();

    const isIdExistedInStorage =  prevFavoriteArticlesIds.some(articleId => articleId === id);

    if (!isIdExistedInStorage) {
        localStorage.setItem(StorageVariables.FAVORITE_ARTICLES_IDS, JSON.stringify([...prevFavoriteArticlesIds, id]));
    }
}

const getReadedArticlesIds = (): string[] => {
    return JSON.parse(localStorage.getItem(StorageVariables.READED_ARTICLES_IDS) || "[]");
}

const saveReaddArticleId = (id: string): void => {
    const prevReadedArticlesIds = getReadedArticlesIds();

    const isIdExistedInStorage =  prevReadedArticlesIds.some(articleId => articleId === id);

    if (!isIdExistedInStorage) {
        localStorage.setItem(StorageVariables.READED_ARTICLES_IDS, JSON.stringify([...prevReadedArticlesIds, id]));
    }
}

export const storage = {
    getFeeds,
    saveFeed,
    getFavoriteArticlesIds,
    saveFavoriteArticleId,
    getReadedArticlesIds,
    saveReaddArticleId,
}
import { normalizeArticleSlug } from "../helpers/normalizeArticleSlug";
import { FetchArticle } from "../types";

declare global {
  interface Window {
    RSSParser: any;
  }
}

const parser = new window.RSSParser();

export const fetchFeedArticles = async (url: string): Promise<FetchArticle[]> => {
  let feedData = null;

  try {
    feedData = await parser.parseURL(url);
  } catch (error) {
    console.error("Error while load rss: " + error);

    return [];
  }

  if (!feedData || !Array.isArray(feedData.items)) {
    return [];
  }

  const feedArticlesData: FetchArticle[] = feedData.items.map((articleData: any) => ({
    id: articleData.guid || null,
    title: articleData.title || null,
    slug: normalizeArticleSlug(articleData.title),
    date: articleData.pubDate || null,
    content: articleData.content || null,
  }));

  return feedArticlesData;
};

export const validateFeedUrl = async (url: string): Promise<boolean> => {
  try {
    const feedData = await parser.parseURL(url);

    if (!feedData || !Array.isArray(feedData.items)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
};

import { Article } from "../types";

declare global {
  interface Window {
    RSSParser: any;
  }
}

const parser = new window.RSSParser();

export const fetchFeedArticles = async (url: string): Promise<Article[]> => {
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

  const feedArticlesData = feedData.items.map((articleData: any) => ({
    id: articleData.guid || null,
    title: articleData.title || null,
    url: articleData.link || null,
    date: articleData.pubDate || null,
    content: articleData.contentSnippet || null,
  }));

  return feedArticlesData;
};

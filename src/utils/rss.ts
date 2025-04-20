import { Article } from "../types";

declare global {
  interface Window {
    RSSParser: any;
  }
}

const parser = new window.RSSParser();

export async function fetchFeedArticles(url: string): Promise<Article[]> {
  const feedData = await parser.parseURL(url);

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
}

import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Article, Feed } from "../../types";
import { fetchFeedArticles } from "../../utils/rss";

type ArticleListViewProps = {
  feeds: Feed[];
};

const sortArticlesByDate = (articles: Article[]) =>
  articles.sort((a, b) => {
    if (!b.date || !a.date) {
      return 0;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

const ArticleListView = ({ feeds }: ArticleListViewProps): ReactElement<ArticleListViewProps> => {
  const [articles, setArticles] = useState<Article[]>([]);

  const { id } = useParams<{ id: string }>();

  const getArticles = async () => {
    const activeFeed = id ? feeds.find((feed) => feed.id === id) : null;

    const currentFeeds = activeFeed ? [activeFeed] : feeds;

    const allFetchedArticles = await Promise.all(
      currentFeeds.map(async (feed) => await fetchFeedArticles(feed.url)),
    );

    const flatArticles = allFetchedArticles.flat();

    const sortedArticles = sortArticlesByDate(flatArticles);

    setArticles(sortedArticles);
  };

  useEffect(() => {
    if (feeds.length === 0) {
      setArticles([]);

      return;
    }

    getArticles();
  }, [id, feeds]);

  return (
    <div>
      {articles.map((article) => (
        <p key={article.id}>{article.title}</p>
      ))}
    </div>
  );
};

export default ArticleListView;

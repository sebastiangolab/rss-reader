import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import ArticleItem from "../../components/ArticleItem";
import { Article, Feed } from "../../types";
import { fetchFeedArticles } from "../../utils/rss";
import "./articlesListView.css";

type ArticleListViewProps = {
  feeds: Feed[];
};

const sortArticlesByDate = (articles: Article[]): Article[] =>
  articles.sort((a, b) => {
    if (!b.date || !a.date) {
      return 0;
    }

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

const ArticleListView = ({
  feeds,
}: ArticleListViewProps): ReactElement<ArticleListViewProps> | null => {
  const [articles, setArticles] = useState<Article[]>([]);

  const { id } = useParams<{ id: string }>();

  const getArticles = async () => {
    const activeFeed = id ? feeds.find((feed) => feed.id === id) : null;

    const currentFeeds = activeFeed ? [activeFeed] : feeds;

    const allFetchedFeedsArticles = await Promise.all(
      currentFeeds.flatMap(async (feed) => ({
        feedId: feed.id,
        items: await fetchFeedArticles(feed.url),
      })),
    );

    const flatArticles: Article[] = allFetchedFeedsArticles.flatMap((article) => {
      return article.items.map((item) => ({
        feedId: article.feedId,
        ...item,
      }));
    });

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
    <div className="articles">
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          date={article.date}
          title={article.title}
          slug={article.slug}
          feedId={article.feedId}
        />
      ))}
    </div>
  );
};

export default ArticleListView;

import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import ArticleItem from "../../components/ArticleItem";
import { useArticlesFiltersContext } from "../../providers/ArticlesFiltersContextProvider";
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
  const [isLoadingArticles, setIsLoadingArticles] = useState<boolean>(false);

  const { filters, getFilteredArticles } = useArticlesFiltersContext();

  const { id } = useParams<{ id: string }>();

  const activeFeed = id ? feeds.find((feed) => feed.id === id) : null;

  const getArticles = async () => {
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

    const filteredArtiles = getFilteredArticles(sortedArticles);

    setArticles(filteredArtiles);

    setIsLoadingArticles(false);
  };

  useEffect(() => {
    setIsLoadingArticles(true);

    if (feeds.length === 0) {
      setArticles([]);

      return;
    }

    getArticles();
  }, [id, feeds, filters]);

  if (isLoadingArticles) {
    return <p className="articles-message">Loading articles...</p>;
  }

  if (articles.length === 0) {
    return <p className="articles-message">No articles</p>;
  }

  return (
    <div className="articles">
      <h1 className="articles-title">{activeFeed?.name ? `Articles: ${activeFeed.name}` : "All Articles"}</h1>

      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          id={article.id}
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

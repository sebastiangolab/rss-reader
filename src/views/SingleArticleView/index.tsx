import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router";
import SingleArticleContent from "../../components/SingleArticleContent";
import { Article } from "../../types";
import { fetchFeedArticles } from "../../utils/rss";
import { storage } from "../../utils/storage";

const SingleArticleView = (): ReactElement => {
  const [articleData, setArticleData] = useState<Article | null>(null);
  const [isLoadingArticle, setIsLoadingArticle] = useState<boolean>(false);

  const { feedId, articleSlug } = useParams<{ feedId: string; articleSlug: string }>();

  const getArticle = async (): Promise<void> => {
    const feeds = storage.getFeeds();

    const currentFeed = feeds.find((feed) => feed.id === feedId);

    if (!currentFeed) {
      return;
    }

    const feedArticles = await fetchFeedArticles(currentFeed.url);

    const currentArticle = feedArticles.find((article) => article.slug === articleSlug);

    if (currentArticle) {
      setArticleData({
        feedId: currentFeed.id,
        ...currentArticle,
      });
    }

    setIsLoadingArticle(false);
  };

  useEffect(() => {
    setIsLoadingArticle(true);
    getArticle();
  }, []);

  return (
    <SingleArticleContent
      isLoading={isLoadingArticle}
      title={articleData?.title || null}
      date={articleData?.date || null}
      content={articleData?.content || null}
    />
  );
};

export default SingleArticleView;

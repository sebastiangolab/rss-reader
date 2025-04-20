import { ReactElement, useEffect, useState } from "react";
import { Article } from "../../types";
import { fetchFeedArticles } from "../../utils/rss";

const ArticleListView = (): ReactElement => {
  const [articles, setArticles] = useState<Article[]>([]);

  const getArticles = async () => {
    const feedArticles = await fetchFeedArticles("https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml");
    setArticles(feedArticles);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <p>{article.title}</p>
      ))}
    </div>
  );
};

export default ArticleListView;

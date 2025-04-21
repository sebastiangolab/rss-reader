import { ReactElement } from "react";
import { Link } from "react-router";
import { Article } from "../../types";
import "./articleItem.css";

type ArticleItemProps = Pick<Article, "date" | "title" | "slug" | "feedId">;

const ArticleItem = ({
  date,
  title,
  slug,
  feedId,
}: ArticleItemProps): ReactElement<ArticleItemProps> | null => {
  if (!date || !title || !slug || !feedId) {
    console.error("Article do not have all data");

    return null;
  }

  return (
    <div className="article-item">
      <p className="article-date">{date}</p>

      <h2 className="article-title">{title}</h2>

      <Link to={`/article/${feedId}/${slug}`} title={title} className="article-link">
        See article
      </Link>
    </div>
  );
};

export default ArticleItem;

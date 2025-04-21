import { ReactElement } from "react";
import { normalizeDate } from "../../helpers/normalizeDate";
import { sanitizeHtml } from "../../helpers/sanitizeHtml";
import { Article } from "../../types";
import "./singleArticleContent.css";

type SingleArticleContentProps = Pick<Article, "date" | "title" | "content"> & {
  isLoading: boolean;
};

const SingleArticleContent = ({
  isLoading,
  date,
  title,
  content,
}: SingleArticleContentProps): ReactElement<SingleArticleContentProps> | null => {
  const cleanContent = content ? sanitizeHtml(content) : "";

  if (isLoading) {
    return (
      <div className="single-article">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="single-article">
      <p className="single-article-date">{normalizeDate(date || "")}</p>
      <h1 className="single-article-title">{title}</h1>
      <div className="article-content" dangerouslySetInnerHTML={{ __html: cleanContent }} />
    </div>
  );
};

export default SingleArticleContent;

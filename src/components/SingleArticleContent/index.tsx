import { ReactElement } from "react";
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
  if (isLoading) {
    return (
      <div className="single-article">
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className="single-article">
      <p className="single-article-date">{date}</p>
      <h1 className="single-article-title">{title}</h1>
      <div className="article-content">{content}</div>
    </div>
  );
};

export default SingleArticleContent;

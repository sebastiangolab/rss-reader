import { ReactElement } from "react";
import { Link } from "react-router";
import { normalizeDate } from "../../helpers/normalizeDate";
import { useArticlesFiltersContext } from "../../providers/ArticlesFiltersContextProvider";
import { Article } from "../../types";
import "./articleItem.css";

type ArticleItemProps = Pick<Article, "id" | "date" | "title" | "slug" | "feedId">;

const ArticleItem = ({
  id,
  date,
  title,
  slug,
  feedId,
}: ArticleItemProps): ReactElement<ArticleItemProps> | null => {
  const {
    checkIsFavoriteArticle,
    setFavoriteArticle,
    removeArticleFromFavorites,
    checkIsReadedArticle,
    setReadedArticle,
  } = useArticlesFiltersContext();

  if (!id || !date || !title || !slug || !feedId) {
    console.error("Article do not have all data");

    return null;
  }

  const isFavorite = checkIsFavoriteArticle(id);
  const isNotReaded = !checkIsReadedArticle(id);

  const handleSetFavorite = () => setFavoriteArticle(id);
  const handleRemoveFromFavorites = () => removeArticleFromFavorites(id);

  const handleSetReadedFavorite = () => setReadedArticle(id);

  return (
    <div className="article-item">
      <div className="article-filters-labels">
        {isFavorite ? <p className="article-label">Favorite</p> : null}
        <p className="article-label">{isNotReaded ? "Unread" : "Readed"}</p>
      </div>

      <p className="article-date">{normalizeDate(date)}</p>

      <h2 className="article-title">{title}</h2>

      <div className="article-links">
        <Link
          to={`/article/${feedId}/${slug}`}
          title={title}
          className="article-link"
          onClick={handleSetReadedFavorite}
        >
          See article
        </Link>

        {isFavorite ? (
          <button className="article-link" onClick={handleRemoveFromFavorites}>
            Remove from favorite
          </button>
        ) : (
          <button className="article-link" onClick={handleSetFavorite}>
            Add to favorite
          </button>
        )}
      </div>
    </div>
  );
};

export default ArticleItem;

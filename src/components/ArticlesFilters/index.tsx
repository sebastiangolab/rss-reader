import { ReactElement } from "react";
import { useArticlesFiltersContext } from "../../providers/ArticlesFiltersContextProvider";

const ArticlesFilters = (): ReactElement => {
  const {
    filters: { isShowFavorite, isShowNoReadedOnly },
    setIsShowFavorite,
    setIsShowNoReadedOnly,
  } = useArticlesFiltersContext();

  return (
    <>
      <label htmlFor="show-favorite-articles" className="form-checkbox-label">
        <input
          type="checkbox"
          id="show-favorite-articles"
          checked={isShowFavorite}
          onChange={() => setIsShowFavorite(!isShowFavorite)}
        />
        <p>Show favorite articles</p>
      </label>

      <label htmlFor="show-not-readed-articles" className="form-checkbox-label">
        <input
          type="checkbox"
          id="show-not-readed-articles"
          checked={isShowNoReadedOnly}
          onChange={() => setIsShowNoReadedOnly(!isShowNoReadedOnly)}
        />
        <p>Show unread articles</p>
      </label>
    </>
  );
};

export default ArticlesFilters;

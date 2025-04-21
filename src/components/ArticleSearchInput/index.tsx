import { FormEvent, ReactElement } from "react";
import { useArticlesFiltersContext } from "../../providers/ArticlesFiltersContextProvider";

const ArticleSearchInput = (): ReactElement => {
  const {
    filters: { searchValue },
    setSearchValue,
  } = useArticlesFiltersContext();

  return (
    <input
      type="text"
      className="form-input light-border"
      value={searchValue}
      onInput={(event: FormEvent<HTMLInputElement>) => setSearchValue(event.currentTarget.value)}
      placeholder="Type article title"
    ></input>
  );
};

export default ArticleSearchInput;

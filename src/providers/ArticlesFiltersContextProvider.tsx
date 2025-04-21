import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Article } from "../types";
import { storage } from "../utils/storage";

type ArticlesFiltersContextValues = {
  filters: {
    searchValue: string;
    isShowFavorite: boolean;
    isShowNoReadedOnly: boolean;
  };
  setSearchValue: Dispatch<SetStateAction<string>>;
  setIsShowFavorite: Dispatch<SetStateAction<boolean>>;
  setIsShowNoReadedOnly: Dispatch<SetStateAction<boolean>>;
  getFilteredArticles: (articles: Article[]) => Article[];
  checkIsFavoriteArticle: (articleId: string) => boolean;
  setFavoriteArticle: (articleId: string) => void;
  removeArticleFromFavorites: (articleId: string) => void;
  checkIsReadedArticle: (articleId: string) => boolean;
  setReadedArticle: (articleId: string) => void;
};

type ArticlesFiltersContextProviderProps = {
  children: ReactNode;
};

const defaultContextValues = {
  filters: {
    searchValue: "",
    isShowFavorite: false,
    isShowNoReadedOnly: false,
  },
  setSearchValue: () => null,
  setIsShowFavorite: () => null,
  setIsShowNoReadedOnly: () => null,
  getFilteredArticles: () => [],
  checkIsFavoriteArticle: () => false,
  setFavoriteArticle: () => null,
  removeArticleFromFavorites: () => null,
  checkIsReadedArticle: () => false,
  setReadedArticle: () => null,
};

const ArticlesFiltersContext = createContext<ArticlesFiltersContextValues>(defaultContextValues);

export const ArticlesFiltersContextProvider = ({
  children,
}: ArticlesFiltersContextProviderProps): ReactElement<ArticlesFiltersContextProviderProps> => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isShowFavorite, setIsShowFavorite] = useState<boolean>(false);
  const [isShowNoReadedOnly, setIsShowNoReadedOnly] = useState<boolean>(false);

  const [favoritesArticlesIds, setFavoritesArticlesIds] = useState<string[]>([]);
  const [readedArticlesIds, setReadedArticlesIds] = useState<string[]>([]);

  const checkIsFavoriteArticle = (articleId: string) => {
    return favoritesArticlesIds.some((favoriteArticleId) => favoriteArticleId === articleId);
  };

  const setFavoriteArticle = (articleId: string) => {
    setFavoritesArticlesIds([...favoritesArticlesIds, articleId]);
  };

  const removeArticleFromFavorites = (articleId: string) => {
    const filteredFavoritesArticlesIds = favoritesArticlesIds.filter(
      (favoriteArticleId) => favoriteArticleId !== articleId,
    );

    setFavoritesArticlesIds(filteredFavoritesArticlesIds);
  };

  const checkIsReadedArticle = (articleId: string) => {
    return readedArticlesIds.some((readedArticleId) => readedArticleId === articleId);
  };

  const setReadedArticle = (articleId: string) => {
    if (!checkIsReadedArticle(articleId)) {
      setReadedArticlesIds([...readedArticlesIds, articleId]);
    }
  };

  const getFilteredArticles = (articles: Article[]): Article[] => {
    let updatedArticles = articles;

    if (isShowFavorite) {
      updatedArticles = updatedArticles.filter((article) =>
        checkIsFavoriteArticle(article.id ?? ""),
      );
    }

    if (isShowNoReadedOnly) {
      updatedArticles = updatedArticles.filter(
        (article) => !checkIsReadedArticle(article.id ?? ""),
      );
    }

    if (searchValue) {
      updatedArticles = updatedArticles.filter((article) => {
        if (!article.title) {
          return false;
        }

        const articleTitle = article.title.toLowerCase();
        const updatedSearchValue = searchValue.toLowerCase();

        return articleTitle.includes(updatedSearchValue);
      });
    }

    return updatedArticles;
  };

  useEffect(() => {
    const storageFavoritesArticlesIds = storage.getFavoriteArticlesIds();

    if (storageFavoritesArticlesIds.length > 0) {
      setFavoritesArticlesIds(storageFavoritesArticlesIds);
    }
  }, []);

  useEffect(() => {
    storage.saveFavoriteArticlesIds(favoritesArticlesIds);
  }, [favoritesArticlesIds]);

  return (
    <ArticlesFiltersContext.Provider
      value={{
        filters: {
          searchValue,
          isShowFavorite,
          isShowNoReadedOnly,
        },
        setSearchValue,
        setIsShowFavorite,
        setIsShowNoReadedOnly,
        getFilteredArticles,
        checkIsFavoriteArticle,
        setFavoriteArticle,
        removeArticleFromFavorites,
        checkIsReadedArticle,
        setReadedArticle,
      }}
    >
      {children}
    </ArticlesFiltersContext.Provider>
  );
};

export const useArticlesFiltersContext = () => useContext(ArticlesFiltersContext);

export default ArticlesFiltersContextProvider;

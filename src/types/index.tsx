export type FetchArticle = {
  id: string | null;
  title: string | null;
  slug: string | null;
  date: string | null;
  content: string | null;
  imageUrl: string | null;
};

export type Article = FetchArticle & {
  feedId: string;
};

export type Feed = {
  id: string;
  name: string;
  url: string;
};

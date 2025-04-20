export type Article = {
  id: string | null;
  title: string | null;
  url: string | null;
  date: string | null;
  content: string | null;
};

export type Feed = {
  id: string,
  name: string,
  url: string,
}
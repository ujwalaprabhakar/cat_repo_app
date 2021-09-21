export type Cat = Readonly<{
  id: string;
  name: string;
}>;

export type CatList = ReadonlyArray<Cat>;

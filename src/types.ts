export type PagePaginatedData<ResponseDataType> = Readonly<{
  results: ReadonlyArray<ResponseDataType>;
  metadata: Readonly<{
    hasNextPage: boolean;
  }>;
}>;

export type CatSummary = {
  id: string;
  name: string;
  url: string | null;
};
export type CatSummaryList = PagePaginatedData<CatSummary>;

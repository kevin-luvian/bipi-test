export interface Sortable {
  sort: Map<string, boolean>;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export class Paginated<T> {
  data: T;
  total: number = 0;

  constructor(data: T, total: number) {
    this.data = data;
    this.total = total;
  }
}

export const SORT_ASC = "asc";
export const SORT_DESC = "desc";

export const GetSort = (sort: boolean) => (sort ? SORT_ASC : SORT_DESC);

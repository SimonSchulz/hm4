import { PaginationAndSorting } from '../types/pagination-and-sorting';
import {paginationAndSortingDefault} from "../utils/query-default-pagination";

export function setSortAndPagination<P = string>(
    query: Partial<PaginationAndSorting<P>>,
): PaginationAndSorting<P> {
    return {
        ...paginationAndSortingDefault,
        ...query,
        sortBy: (query.sortBy ?? paginationAndSortingDefault.sortBy) as P,
    };
}
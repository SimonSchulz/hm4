import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {PostSortField} from "./PostSortFilds";

export type PostQueryInput = PaginationAndSorting<PostSortField> &
    Partial<{
        searchNameTerm: string;
    }>;
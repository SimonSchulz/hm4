import {PostViewModel} from "../../posts/types/post-view-model";
import {BlogViewModel} from "../../blogs/types/blog-view-model";

export type PaginatedOutput = {
    page: number;
    pageSize: number;
    pagesCount: number;
    totalCount: number;
    items: BlogViewModel[] | PostViewModel [];
}
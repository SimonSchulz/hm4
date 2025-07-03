import {Request, Response} from "express";
import {setSortAndPagination} from "../../../core/helpers/set-sort-and-pagination";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postService} from "../../../posts/application/posts.service";
import {mapToPostListModel} from "../../../posts/routers/mappers/map-to-post-list";
import {PostQueryInput} from "../../../posts/types/post-query.input";

export async function getPostsByBlogIdHandler(
    req: Request<{ blogId: string }, {}, {}, PostQueryInput>,
    res: Response
) {
    try {
        const blogId = req.params.blogId;
        const query = setSortAndPagination(req.query);
        const { items, totalCount } = await postService.findPostsByBlogId(blogId, query);
        const result = mapToPostListModel(items, totalCount, query);
        res.send(result);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}
import { NextFunction, Request, Response } from "express";
import {setSortAndPagination} from "../../../core/helpers/set-sort-and-pagination";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postService} from "../../../posts/application/posts.service";
import {mapToPostListModel} from "../../../posts/routers/mappers/map-to-post-list";
import {PostQueryInput} from "../../../posts/types/post-query.input";
import { ValidationError } from "../../../core/utils/app-response-errors";
import { blogService } from "../../application/blog.service";

export async function getPostsByBlogIdHandler(
    req: Request<{ blogId: string }, {}, {}, PostQueryInput>,
    res: Response,
    next: NextFunction
) {
    try {
        const blogId = req.params.blogId;
        const blog = await blogService.findByIdOrFail(blogId);
        if (!blog) {
         throw new ValidationError('Invalid blogId');
        }
        const query = setSortAndPagination(req.query);
        const { items, totalCount } = await postService.findPostsByBlogId(blogId, query);
        const result = mapToPostListModel(items, totalCount, query);
        res.send(result);
    } catch (e: unknown) {
        next(e);
    }
}
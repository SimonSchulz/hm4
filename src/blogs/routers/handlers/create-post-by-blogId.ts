import { NextFunction, Request, Response } from "express";
import {PostInputDto} from "../../../posts/dto/post.input-dto";
import {postService} from "../../../posts/application/posts.service";
import {mapToPostViewModel} from "../../../posts/routers/mappers/map-to-post-view-model";
import {HttpStatus} from "../../../core/types/http-statuses";
import { ValidationError } from "../../../core/utils/app-response-errors";

export async function createPostByBlogIdHandler(
    req: Request<{}, {
        blogId: string;
    }, PostInputDto>,
    res: Response,
    next: NextFunction
) {
    try {
        const post = await postService.create(req.body);
      if (!post) {
        throw new ValidationError('Invalid data');
      }
        const postViewModel = mapToPostViewModel(post);
        res.status(HttpStatus.Created).send(postViewModel);
    } catch (e: unknown) {
       next(e);
    }
}

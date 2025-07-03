import { NextFunction, Request, Response } from "express";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";
import {postService} from "../../application/posts.service";

export async function getPostHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const post = await postService.findByIdOrFail(id);
    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: "id", message: "Post not found" }]),
        );
      return;
    }
    const result = mapToPostViewModel(post);
    res.send(result);
  } catch (e: unknown) {
    next(e);
  }
}

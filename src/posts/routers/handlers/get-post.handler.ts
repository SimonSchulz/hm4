import { Request, Response } from "express";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/post.repository";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";

export async function getPostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await postsRepository.findById(id);
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
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

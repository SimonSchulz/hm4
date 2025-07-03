import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { PostInputDto } from "../../dto/post.input-dto";
import {postService} from "../../application/posts.service";

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response,
) {
  try {
    const id = req.params.id;
    await postService.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

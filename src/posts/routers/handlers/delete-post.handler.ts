import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import {postService} from "../../application/posts.service";

export async function deletePostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    await postService.delete(id);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

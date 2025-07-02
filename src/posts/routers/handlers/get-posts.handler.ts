import { Request, Response } from "express";
import { postsRepository } from "../../repositories/post.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";

export async function getPostsHandler(req: Request, res: Response) {
  try {
    const Posts = await postsRepository.findAll();
    const result = Posts.map(mapToPostViewModel);
    res.send(result);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

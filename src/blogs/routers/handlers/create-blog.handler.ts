import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { BlogInputDto } from "../../dto/blog.input-dto";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model";
import {blogService} from "../../application/blog.service";

export async function createBlogHandler(
  req: Request<{}, {}, BlogInputDto>,
  res: Response,
) {
  try {
    const createdBlog = await blogService.create(req.body);
    const blogViewModel = mapToBlogViewModel(createdBlog);
    console.log(blogViewModel);
    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model";
import { HttpStatus } from "../../../core/types/http-statuses";

export async function getBlogsHandler(req: Request, res: Response) {
  try {
    const blogs = await blogsRepository.findAll();
    const blogsViewModels = blogs.map(mapToBlogViewModel);
    res.send(blogsViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

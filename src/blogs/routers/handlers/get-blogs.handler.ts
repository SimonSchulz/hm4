import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import {setSortAndPagination} from "../../../core/helpers/set-sort-and-pagination";
import {BlogQueryInput} from "../../types/blog-query.input";
import {mapToBlogListModel} from "../mappers/map-to-blog-list-model";
import {blogService} from "../../application/blog.service";

export async function getBlogsHandler(  req: Request<{}, {}, {}, BlogQueryInput>,
                                        res: Response,) {
  try {
    const query = setSortAndPagination(req.query);
    const {items, totalCount} = await blogService.findMany(query);
    const result = mapToBlogListModel(items,totalCount,query);
    res.send(result);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

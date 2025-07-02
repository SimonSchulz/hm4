import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import {postService} from "../../application/posts.service";
import {setSortAndPagination} from "../../../core/helpers/set-sort-and-pagination";
import {mapToPostListModel} from "../mappers/map-to-post-list";
import {PostQueryInput} from "../../types/post-query.input";

export async function getPostsHandler(req: Request<{}, {}, {}, PostQueryInput>, res: Response) {
  try {
    const query = setSortAndPagination(req.query);
    const {items, totalCount} = await postService.findMany(query);
    const result = mapToPostListModel(items,totalCount,query);
    res.send(result);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

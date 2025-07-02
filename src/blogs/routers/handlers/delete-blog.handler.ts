import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import {blogsRepository} from "../../repositories/blog.repository";
import {blogService} from "../../application/blog.service";

export async function deleteBlogHandler(req: Request<{id:string}>, res: Response) {
    try{
        const id = req.params.id;
        await blogService.delete(id);
        res.sendStatus(HttpStatus.NoContent);
    }
    catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError);
    }
}
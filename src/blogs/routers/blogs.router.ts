import { Router } from 'express';
import {authMiddleware} from "../../auth/auth-middleware";
import {idValidation} from "../../core/utils/params-id.validation";
import {getBlogsHandler} from "./handlers/get-blogs.handler";
import {getBlogHandler} from "./handlers/get-blog.handler";
import {inputValidationResultMiddleware} from "../../core/utils/input-validtion-result.middleware";
import {blogInputDtoValidation} from "../validation/blog.input-dto.validation";
import {deleteBlogHandler} from "./handlers/delete-blog.handler";
import {updateBlogHandler} from "./handlers/update-blog.handler";
import {createBlogHandler} from "./handlers/create-blog.handler";

export const blogsRouter = Router({});

blogsRouter
    .get('', getBlogsHandler)

    .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)

    .post(
        '',
        authMiddleware,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        createBlogHandler,
    )

    .put(
        '/:id',
        authMiddleware,
        idValidation,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        updateBlogHandler,
    )

    .delete(
        '/:id',
        authMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deleteBlogHandler,
    );
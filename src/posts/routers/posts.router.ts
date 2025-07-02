import { Router } from 'express';
import {authMiddleware} from "../../auth/auth-middleware";
import {idValidation} from "../../core/utils/params-id.validation";
import {inputValidationResultMiddleware} from "../../core/utils/input-validtion-result.middleware";
import {postInputDtoValidation} from "../validation/post.input-dto.validation";
import {getPostHandler} from "./handlers/get-post.handler";
import {getPostsHandler} from "./handlers/get-posts.handler";
import {createPostHandler} from "./handlers/create-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {deletePostHandler} from "./handlers/delete-post.handler";


export const postsRouter = Router({});

postsRouter
    .get('', getPostsHandler)

    .get('/:id', idValidation, inputValidationResultMiddleware, getPostHandler)

    .post(
        '',
        authMiddleware,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        createPostHandler,
    )

    .put(
        '/:id',
        authMiddleware,
        idValidation,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        updatePostHandler,
    )

    .delete(
        '/:id',
        authMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deletePostHandler,
    );
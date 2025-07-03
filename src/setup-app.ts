import express, { Express } from 'express';
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from "./core/paths/paths";
import {postsRouter} from "./posts/routers/posts.router";
import {blogsRouter} from "./blogs/routers/blogs.router";
import {testingRouter} from "./testing/testing.router";
import { errorHandlerMiddleware } from "./core/utils/error-handler-middleware";


export const setupApp = (app: Express) => {
    app.use(express.json());

    app.get('/', (req, res) => {
        res.status(200).send('hello world!!!');
    });

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);
    // @ts-ignore
    app.use(errorHandlerMiddleware);
    return app;
};
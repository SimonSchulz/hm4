import {Post} from "../types/post";
import {PostInputDto} from "../dto/post.input-dto";
import {PostQueryInput} from "../types/post-query.input";
import {WithId} from "mongodb";
import {postsRepository} from "../repositories/post.repository";
import {blogsRepository} from "../../blogs/repositories/blog.repository";
import {mapToBlogViewModel} from "../../blogs/routers/mappers/map-to-blog-view-model";

export const postService = {
    async findMany(
        queryDto: PostQueryInput
    ):  Promise<{ items:WithId<Post>[], totalCount:number}>  {
        return postsRepository.findMany(queryDto);
    },

    async findByIdOrFail(id: string): Promise<WithId<Post> | null> {
        return postsRepository.findByIdOrFail(id);
    },

    async create(dto: PostInputDto): Promise<WithId<Post>> {
        const blog = await blogsRepository.findByIdOrFail(dto.blogId);
        let blogName = "";
        if (blog) {
            blogName = mapToBlogViewModel(blog).name;
        }
        let newPost = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId,
            blogName: blogName,
            createdAt: new Date().toISOString(),
        };

        return postsRepository.create(newPost);
    },

    async update(id: string, dto: PostInputDto): Promise<void> {
        await postsRepository.update(id, dto);
        return;
    },

    async delete(id: string): Promise<void> {
        await postsRepository.delete(id);
        return;
    },
};
import { FieldResolver, Resolver, Root } from "type-graphql";
import Post from "../types/Post";

import { CommentModel } from "../database";

@Resolver(Post)
export default class {
    @FieldResolver()
    async _id(@Root() parent: Post) {
        return parent._id;
    }

    @FieldResolver()
    async authorID(@Root() parent: Post) {
        return parent.authorID;
    }

    @FieldResolver()
    async title(@Root() parent: Post) {
        return parent.title;
    }

    @FieldResolver()
    async content(@Root() parent: Post) {
        return parent.content;
    }

    @FieldResolver()
    async category(@Root() parent: Post) {
        return parent.category;
    }

    @FieldResolver()
    async tag(@Root() parent: Post) {
        return parent.tag;
    }

    @FieldResolver()
    async timestamp(@Root() parent: Post) {
        return parent.timestamp;
    }

    @FieldResolver()
    async hearts(@Root() parent: Post) {
        return parent.hearts;
    }

    @FieldResolver()
    async comments(@Root() parent: Post) {
        return (await CommentModel.findByPost(parent._id))
            .map(i => i._doc);
    }
}
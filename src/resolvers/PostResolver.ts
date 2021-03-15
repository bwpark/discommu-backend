import { FieldResolver, Resolver, Root } from "type-graphql";

import { Post } from "../types/Post";
import { User } from "../types/User";

import { CommentModel } from "../database";
import { getUser } from "../util";

@Resolver(Post)
export default class {
    @FieldResolver()
    async _id(@Root() parent: Post) {
        return parent._id;
    }

    @FieldResolver(returns => User)
    async author(@Root() parent: Post) {
        const res = await getUser(parent.authorID)
        if (!res) return null;

        return {
            id: res.id,
            discriminator: res.discriminator,
            username: res.username,
            avatarURL: res.avatarURL,
            permissions: res.userInfo.permissions,
            following: res.userInfo.following
        };
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
import { FieldResolver, Resolver, Root } from "type-graphql";
import { getUser } from "../util";

import { Comment } from "../types/Comment";
import { User } from "../types/User";

@Resolver(Comment)
export default class {
    @FieldResolver(returns => User)
    async author(@Root() parent: Comment) {
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
    async reply(@Root() parent: Comment) {
        return parent.reply;
    }

    @FieldResolver()
    async content(@Root() parent: Comment) {
        return parent.content;
    }

    @FieldResolver()
    async _id(@Root() parent: Comment) {
        return parent._id;
    }

    @FieldResolver()
    async timestamp(@Root() parent: Comment) {
        return parent.timestamp;
    }

    @FieldResolver()
    async postID(@Root() parent: Comment) {
        return parent.postID;
    }
}

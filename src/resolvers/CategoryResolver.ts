import { FieldResolver, Resolver, Root } from "type-graphql";
import { PostModel } from "../database";
import { getUser } from "../util";

import { Category } from "../types/Category";
import { User } from "../types/User";

@Resolver(Category)
export default class {
    @FieldResolver(returns => User)
    async author(@Root() parent: Category) {
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
    async name(@Root() parent: Category) {
        return parent.name;
    }

    @FieldResolver()
    async description(@Root() parent: Category) {
        return parent.description;
    }

    @FieldResolver()
    async posts(@Root() parent: Category) {
        const res = await PostModel.find({ category: parent.name })
        return res.map(r => r._doc);
    }
}

import { ObjectType, Field, Root, Ctx, Arg } from "type-graphql";
import { getUser } from "../util";
import { PostModel } from "../database";

import Post from "./Post";
import EditPost from "../inputs/EditPost"

@ObjectType()
export default class PostMutation {
    @Field((returns) => Boolean)
    async edit(@Root() root: Post, @Ctx() ctx: any, @Arg("data") data: EditPost) {
        if (!ctx.user) return false;
        if (!data.content) return false;

        const user = await getUser(ctx.user.id);
        if ((user.userID !== root.author) && (!user.userInfo.permissions.includes("admin"))) return false;

        const post = await PostModel.findById(root.id);
    }
}
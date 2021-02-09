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
        if ((!data.title) || (!data.content)) return false;
        data.tag = data.tag ? data.tag.filter(tag => tag.length) : [];

        const user = await getUser(ctx.user.id);
        if ((user.userID !== root.authorID) && (!user.userInfo.permissions.includes("admin"))) return false;

        await PostModel.findByIdAndUpdate(root._id, { $set: { title: data.title, content: data.content, tag: data.tag } })
        return true;
    }

    @Field((returns) => Boolean)
    async delete(@Root() root: Post, @Ctx() ctx: any) {
        if (!ctx.user) return false;

        const user = await getUser(ctx.user.id);
        if ((user.userID !== root.authorID) && (!user.userInfo.permissions.includes("admin"))) return false;

        await PostModel.findByIdAndDelete(root._id);
        return true;
    }

    @Field((returns) => Boolean)
    async addHeart(@Root() root: Post, @Ctx() ctx: any) {
        if (!ctx.user) return false;

        if (root.hearts.includes(ctx.user.id)) return false;
        const post = await PostModel.findById(root._id);
        await post.addHeart(ctx.user.id);

        return true;
    }

    @Field((returns) => Boolean)
    async removeHeart(@Root() root: Post, @Ctx() ctx: any) {
        if (!ctx.user) return false;

        if (!root.hearts.includes(ctx.user.id)) return false;
        const post = await PostModel.findById(root._id);
        await post.removeHeart(ctx.user.id);

        return true;
    }
}
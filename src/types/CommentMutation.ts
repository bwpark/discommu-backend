import { ObjectType, Field, Root, Ctx, Arg } from "type-graphql";
import { Comment } from "./Comment";

import { getUser } from "../util";
import { CommentModel } from "../database";

@ObjectType()
export default class CommentMutation {
    @Field((returns) => Boolean)
    async edit(@Root() root: Comment, @Ctx() ctx: any, @Arg("content") content: string) {
        if ((!ctx.user) || (!content)) return false;

        const user = await getUser(ctx.user.id);
        if ((user.userID !== root.authorID) && (!user.userInfo.permissions.includes("admin"))) return false;

        await CommentModel.findByIdAndUpdate(root._id, {
            $set: {
                content: content
            }
        });
        return true;
    }

    @Field((returns) => Boolean)
    async delete(@Root() root: Comment, @Ctx() ctx: any) {
        if (!ctx.user) return false;

        const user = await getUser(ctx.user.id);
        if ((user.userID !== root.authorID) && (!user.userInfo.permissions.includes("admin"))) return false;

        await CommentModel.findByIdAndDelete(root._id);
        return true;
    }
}
import { ObjectType, Field, Root, Ctx, Arg } from "type-graphql";
import Category from "./Category";

import { getUser } from "../util";
import { CategoryModel } from "../database";

@ObjectType()
export default class CategoryMutation {
    @Field((returns) => Boolean)
    async edit(@Root() root: Category, @Ctx() ctx: any, @Arg("description") description: string) {
        if (!ctx.user) return false;
        const user = await getUser(ctx.user.id);
        if ((user.userID !== root.authorID) && (!user.userInfo.permissions.includes("admin"))) return false;

        const category = await CategoryModel.findOne({ name: root.name });
        await category.editDescription(description);
        return true;
    }

    @Field((returns) => Boolean)
    async delete(@Root() root: Category, @Ctx() ctx: any) {
        if (!ctx.user) return false;
        const user = await getUser(ctx.user.id);
        if ((user.userID !== root.authorID) && (!user.userInfo.permissions.includes("admin"))) return false;

        await CategoryModel.deleteOne({ name: root.name });
        return true;
    }
}
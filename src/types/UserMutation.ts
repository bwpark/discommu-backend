import { ObjectType, Field, Arg, Ctx, Root } from 'type-graphql'
import User from './User'
import { getUser } from '../util'
import config from "../../config.json";

@ObjectType()
export default class UserMutation {
    @Field((returns) => Boolean)
    async follow(@Root() rootuser: User, @Ctx() ctx: any, @Arg("id") id: string) {
        if (!ctx.user) return false;
        const user = await getUser(ctx.user.id);
        if ((user.userID !== rootuser.id) && (!user.userInfo.permissions.includes("admin"))) return false;

        const ruser = await getUser(rootuser.id);
        if (!(await getUser(id))) return false;
        if (ruser.userInfo.following.includes(id)) return false;

        await ruser.userInfo.addFollowing(id);
        return true;
    }

    @Field((returns) => Boolean)
    async unfollow(@Root() rootuser: User, @Ctx() ctx: any, @Arg("id") id: string) {
        if (!ctx.user) return false;
        const user = await getUser(ctx.user.id);
        if ((user.userID !== rootuser.id) && (!user.userInfo.permissions.includes("admin"))) return false;

        const ruser = await getUser(rootuser.id);
        if (!(await getUser(id))) return false;
        if (!ruser.userInfo.following.includes(id)) return false;

        await ruser.userInfo.removeFollowing(id);
        return true;
    }

    @Field((returns) => Boolean)
    async addpermission(@Root() rootuser: User, @Ctx() ctx: any, @Arg("permission") perm: string) {
        if (!config.permissions.includes(perm)) return false;
        if (!ctx.user) return false;
        const user = await getUser(ctx.user.id);
        if (!user.userInfo.permissions.includes("admin")) return false;

        const ruser = await getUser(rootuser.id);
        if (ruser.userInfo.permissions.includes(perm)) return false;

        await ruser.userInfo.addPermissions(perm);
        return true;
    }

    @Field((returns) => Boolean)
    async removepermission(@Root() rootuser: User, @Ctx() ctx: any, @Arg("permission") perm: string) {
        if (!config.permissions.includes(perm)) return;
        if (!ctx.user) return false;
        const user = await getUser(ctx.user.id);
        if (!user.userInfo.permissions.includes("admin")) return false;

        const ruser = await getUser(rootuser.id);
        if (!ruser.userInfo.permissions.includes(perm)) return false;

        await ruser.userInfo.removePermissions(perm);
        return true;
    }
}
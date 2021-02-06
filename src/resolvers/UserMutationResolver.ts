import { Resolver, Root, Mutation, Arg, Ctx } from 'type-graphql'
import { getUser } from "../util";

import User from '../types/User'
import UserMutation from '../types/UserMutation'
import config from "../../config.json";

@Resolver(UserMutation)
export default class {
    @Mutation((returns) => Boolean, { nullable: true })
    async follow(@Root() rootuser: User, @Ctx() ctx: any, @Arg("id") id: string) {
        if (!ctx.user) return null;
        const user = await getUser(ctx.user.id);
        if ((user.userID !== rootuser.id) && (!user.permissions.includes("admin"))) return null;

        const ruser = await getUser(rootuser.id);
        if (!(await getUser(id))) return null;
        if (ruser.userInfo.following.includes(id)) return null;

        await ruser.userInfo.addFollowing(id);
        return true;
    }

    @Mutation((returns) => Boolean, { nullable: true })
    async unfollow(@Root() rootuser: User, @Ctx() ctx: any, @Arg("id") id: string) {
        if (!ctx.user) return null;
        const user = await getUser(ctx.user.id);
        if ((user.userID !== rootuser.id) && (!user.permissions.includes("admin"))) return null;

        const ruser = await getUser(rootuser.id);
        if (!(await getUser(id))) return null;
        if (!ruser.userInfo.following.includes(id)) return null;

        await ruser.userInfo.removeFollowing(id);
        return true;
    }

    @Mutation((returns) => Boolean, { nullable: true })
    async addpermission(@Root() rootuser: User, @Ctx() ctx: any, @Arg("permission") perm: string) {
        if (!config.permissions.includes(perm)) return;
        if (!ctx.user) return null;
        const user = await getUser(ctx.user.id);
        if (!user.permissions.includes("admin")) return null;

        const ruser = await getUser(rootuser.id);
        if (ruser.userInfo.permissions.includes(perm)) return null;

        await ruser.userInfo.addPermissions(perm);
        return true;
    }

    @Mutation((returns) => Boolean, { nullable: true })
    async removepermission(@Root() rootuser: User, @Ctx() ctx: any, @Arg("permission") perm: string) {
        if (!config.permissions.includes(perm)) return;
        if (!ctx.user) return null;
        const user = await getUser(ctx.user.id);
        if (!user.permissions.includes("admin")) return null;

        const ruser = await getUser(rootuser.id);
        if (!ruser.userInfo.permissions.includes(perm)) return null;

        await ruser.userInfo.removePermissions(perm);
        return true;
    }
}

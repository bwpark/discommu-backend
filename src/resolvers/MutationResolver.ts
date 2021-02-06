import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { userInfoCache, getUser } from "../util";

import UserMutation from "../types/UserMutation";

@Resolver()
export default class MutationResolver {
    @Mutation((returns) => UserMutation, { nullable: true })
    me(@Ctx() ctx) {
      return ctx.user
    }

    @Mutation((returns) => UserMutation, { nullable: true })
    async user(@Arg("id") id: string) {
        await getUser(id);
        return { id: id, ...userInfoCache[id] }
    }
}
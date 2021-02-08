import { Resolver, Arg, Ctx, Query } from "type-graphql";

import { userInfoCache, getUser } from "../util";
import { CategoryModel, PostModel } from "../database";

import config from "../../config.json";
import User from "../types/User";
import Category from "../types/Category";
import Post from "../types/Post";

@Resolver()
export default class DefaultResolver {
    @Query((returns) => User, { nullable: true })
    me(@Ctx() ctx) {
        if (!ctx.user) return null;
        return ctx.user
    }

    @Query((returns) => User, { nullable: true })
    async user(@Arg("id") id: string) {
        if (!(await getUser(id))) return null;
        return { id: id, ...userInfoCache[id] }
    }

    @Query((returns) => Category, { nullable: true })
    async category(@Ctx() ctx, @Arg("name") name: string) {
        if (!ctx.user) return null;
        const categoryInfo = await CategoryModel.findOne({ name: name });
        if (!categoryInfo) return null;
        return { author: categoryInfo.authorID, name: categoryInfo.name, description: categoryInfo.description };
    }

    @Query((returns) => Post, { nullable: true })
    async post(@Ctx() ctx, @Arg("title") title: string) {
        if (!ctx.user) return null;
        const postInfo = await PostModel.findOne({ title: title });
        if (!postInfo) return null;
        return { author: postInfo.authorID, title: postInfo.title, content: postInfo.content, category: postInfo.category, tag: postInfo.tag, hearts: postInfo.hearts, comments: postInfo.comments };
    }

    @Query((returns) => String)
    loginURL() {
        return (
            `${config.discordAPIEndpoint}/oauth2/authorize?client_id=${config.oauth2.clientID}&redirect_uri=${config.oauth2.redirectURI}&scope=identify&response_type=code`
        )
    }
}

import { Resolver, Arg, Ctx, Query } from "type-graphql";

import { getUser } from "../util";
import { CategoryModel, PostModel, CommentModel, UserModel } from "../database";
import config from "../../config.json";

import User from "../types/User";
import Category from "../types/Category";
import Post from "../types/Post";
import { Comment } from "../types/Comment";

@Resolver()
export default class DefaultResolver {
    @Query((returns) => User, { nullable: true })
    me(@Ctx() ctx) {
        if (!ctx.user) return null;
        return {
            id: ctx.user.discordID,
            discriminator: ctx.user.discriminator,
            username: ctx.user.username,
            avatarURL: ctx.user.avatarURL,
            permissions: ctx.user.userInfo.permissions,
            following: ctx.user.userInfo.following
        };
    }

    @Query((returns) => User, { nullable: true })
    async user(@Arg("id") id: string) {
        const res = await getUser(id);
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

    @Query((returns) => Category, { nullable: true })
    async category(@Arg("name") name: string) {
        const categoryInfo = await CategoryModel.findOne({ name: name });
        if (!categoryInfo) return null;
        return categoryInfo._doc;
    }

    @Query((returns) => Post, { nullable: true })
    async post(@Arg("id") id: string) {
        const postInfo = await PostModel.findById(id);
        if (!postInfo) return null;
        return postInfo._doc;
    }

    @Query((returns) => Comment, { nullable: true })
    async comment(@Arg("id") id: string) {
        const commentInfo = await CommentModel.findById(id);
        if (!commentInfo) return null;
        return commentInfo._doc;
    }

    @Query((returns) => [User])
    async users() {
        const dbusers = await UserModel.find({});
        let users = [];

        for (const i in await UserModel.find({})) {
            const res = await getUser(dbusers[i].discordID);
            users.push({
                id: res.id,
                discriminator: res.discriminator,
                username: res.username,
                avatarURL: res.avatarURL,
                permissions: res.userInfo.permissions,
                following: res.userInfo.following 
            });
        }

        return users;
    }

    @Query((returns) => [Category])
    async categories() {
        return (await CategoryModel.find({}))
            .map(i => i._doc);
    }

    @Query((returns) => [Post])
    async posts() {
        return (await PostModel.find({}))
            .map(i => i._doc);
    }

    @Query((returns) => String)
    loginURL() {
        return (
            `${config.discordAPIEndpoint}/oauth2/authorize?client_id=${config.oauth2.clientID}&redirect_uri=${config.oauth2.redirectURI}&scope=identify&response_type=code`
        )
    }
}

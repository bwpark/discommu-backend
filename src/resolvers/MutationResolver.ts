import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { URLSearchParams } from "url"
import { sign } from "jsonwebtoken";
import { userInfoCache, getUser, safeFetch } from "../util";
import { CategoryModel, UserModel, PostModel, CommentModel } from "../database";

import AddCategory from "../inputs/AddCategory";
import AddPost from "../inputs/AddPost";

import config from "../../config.json";
import fetch from "node-fetch";

import UserMutation from "../types/UserMutation";
import CategoryMutation from "../types/CategoryMutation";
import PostMutation from "../types/PostMutation";
import CommentMutation from "../types/CommentMutation";

@Resolver()
export default class MutationResolver {
    @Mutation((returns) => UserMutation, { nullable: true })
    me(@Ctx() ctx) {
        if (!ctx.user) return null;
        return ctx.user;
    }

    @Mutation((returns) => UserMutation, { nullable: true })
    async user(@Arg("id") id: string) {
        if (!(await getUser(id))) return null;
        return { id: id, ...userInfoCache[id] };
    }

    @Mutation((returns) => CategoryMutation, { nullable: true })
    async category(@Ctx() ctx, @Arg("name") name: string) {
        if (!ctx.user) return null;
        const categoryInfo = await CategoryModel.findOne({ name: name });
        if (!categoryInfo) return null;
        return categoryInfo._doc;
    }

    @Mutation((returns) => PostMutation, { nullable: true })
    async post(@Ctx() ctx, @Arg("id") id: string) {
        if (!ctx.user) return null;
        const postInfo = await PostModel.findById(id);
        if (!postInfo) return null;
        return postInfo._doc;
    }

    @Mutation((returns) => CommentMutation, { nullable: true })
    async comment(@Ctx() ctx, @Arg("id") id: string) {
        if (!ctx.user) return null;
        const commentInfo = await CommentModel.findById(id);
        if (!commentInfo) return null;
        return commentInfo._doc;
    }

    @Mutation((returns) => Boolean, { nullable: true })
    async addCategory(@Ctx() ctx, @Arg("data") data: AddCategory) {
        if (!ctx.user) return false;

        if (await CategoryModel.findOne({ name: data.name })) return false;
        await CategoryModel.create({ name: data.name, description: data.description, authorID: ctx.user.id });
        return true;
    }

    @Mutation((returns) => String, { nullable: true })
    async addPost(@Ctx() ctx, @Arg("data") data: AddPost) {
        console.log(data)
        if (!ctx.user) return false;
        data.tag = data.tag ? data.tag.filter(tag => tag.length) : [];

        if (!(await CategoryModel.findOne({ name: data.category }))) return false;
        const post = await PostModel.create({
            authorID: ctx.user.id,
            title: data.title,
            content: data.content,
            category: data.category,
            timestamp: Date.now(),
            tag: data.tag
        })
        return post._id;
    }

    @Mutation((returns) => String, { nullable: true })
    async login(@Arg("code") code: string, @Ctx() ctx: any) {
        if (ctx.user) return null;

        const res = await fetch(config.discordAPIEndpoint + "/oauth2/token", {
            body: new URLSearchParams({
                client_id: config.oauth2.clientID,
                code,
                client_secret: config.oauth2.clientSecret,
                redirect_uri: config.oauth2.redirectURI,
                grant_type: "authorization_code",
                scope: "identify"
            }),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        });

        const json = await res.json();
        if ((res.status !== 200) || (!json.access_token)) return null;

        const user = await safeFetch(
            `${config.discordAPIEndpoint}/users/@me`,
            {
                headers: {
                    Authorization: `${json.token_type} ${json.access_token}`
                }
            }
        );

        const json2 = await user.json();
        if (user.status !== 200) return null;

        const userInfo = await UserModel.findOneOrCreate({ discordID: json2.id });
        userInfoCache[userInfo.discordID] = {
            username: json2.username,
            avatarURL: json2.avatar
                ? `https://cdn.discordapp.com/avatars/${userInfo.discordID}/${json2.avatar}.png`
                : `https://cdn.discordapp.com/embed/avatars/${Number(json2.discriminator) % 5}.png`,
            discriminator: json2.discriminator
        };
        return sign({ id: userInfo.discordID, ...userInfoCache[userInfo.discordID] }, config.jwtSecret);
    }
}
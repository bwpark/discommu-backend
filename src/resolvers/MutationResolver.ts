import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { URLSearchParams } from "url"
import { sign } from "jsonwebtoken";
import { userInfoCache, getUser, safeFetch } from "../util";
import { CategoryModel, UserModel } from "../database";

import AddCategory from "../inputs/AddCategory";

import config from "../../config.json";
import fetch from "node-fetch";
import UserMutation from "../types/UserMutation";
import CategoryMutation from "../types/CategoryMutation";

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
        return { author: categoryInfo.authorID, name: categoryInfo.name, description: categoryInfo.description };
    }

    @Mutation((returns) => Boolean, { nullable: true })
    async addCategory(@Ctx() ctx, @Arg("data") data: AddCategory) {
        if (!ctx.user) return false;
        if ((!data.name) || (!data.description)) return false;

        if (await CategoryModel.findOne({ name: data.name })) return false;
        await CategoryModel.create({ name: data.name, description: data.description});
        return true;
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
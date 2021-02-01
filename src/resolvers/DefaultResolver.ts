import { Resolver, Mutation, Arg, Ctx, Query } from "type-graphql";
import { URLSearchParams } from "url"

import { safeFetch, userInfoCache, getUser } from "../util";
import { UserModel } from "../database/users/users.models";
import { sign } from "jsonwebtoken";

import fetch from "node-fetch";
import config from "../../config.json";
import User from '../types/User'

@Resolver()
export default class DefaultResolver {
    @Query((returns) => User, { nullable: true })
    me(@Ctx() ctx) {
      return ctx.user
    }

    @Query((returns) => User, { nullable: true })
    async user(@Arg("id") id: string) {
        await getUser(id);
        return { id: id, ...userInfoCache[id] }
    }

    @Query((returns) => String)
    loginURL() {
        return (
            `${config.discordAPIEndpoint}/oauth2/authorize?client_id=${config.oauth2.clientID}&redirect_uri=${config.oauth2.redirectURI}&scope=identify&response_type=code`
        )
    }

    @Mutation((returns) => Boolean, { nullable: true })
    async follow(@Arg("id") id: string, @Ctx() ctx: any) {
        if (!ctx.user) return null;

        const followuser = await getUser(id);
        if (!followuser) return null;

        const user = await getUser(ctx.user.id);
        if (user.userInfo.following.includes(id)) return null;

        await user.userInfo.addFollowing(id);
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

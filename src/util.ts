import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import { UserModel } from "./database";

import config from "../config.json";

export let userInfoCache = {};

export const safeFetch = (
    info: RequestInfo,
    init: RequestInit
): Promise<Response> => new Promise(async (resolve, reject) => {
    let rejected = false;
    const data = (await fetch(info, init).catch(() => {
        rejected = true;
        return reject();
    })) as Response;

    if (rejected) return;
    if (data.status === 429) {
        // @ts-ignore
        return new Promise(async (_resolve) => 
            setTimeout(
                await data.json().then((r) => r.retry_after),
                _resolve as any
            )
        ).then(() => resolve(safeFetch(info, init)));
    };
    resolve(data);
});

export const getDiscordUser = async (userID: string) => {
    if (userInfoCache[userID]) return userInfoCache[userID];
    const res = await safeFetch(
        `${config.discordAPIEndpoint}/users/${userID}`,
        {
            headers: {
                Authorization: `Bot ${config.botToken}`
            }
        }
    );
    if (res.status !== 200) return null;
    const json = await res.json();
    const data = {
        username: json.username,
        avatarURL: json.avatar
            ? `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/${Number(json.discriminator) % 5}.png`,
        discriminator: json.discriminator
    };

    userInfoCache[json.id] = data;

    return data;
}

export const getUser = async (userID: string) => {
    if (!userInfoCache[userID]) await getDiscordUser(userID);
    const userInfo = await UserModel.findOne({ discordID: userID });
    if (!userInfo) return null;
    return {id: userInfo.discordID, userInfo: userInfo.toObject(), ...userInfoCache[userID]};
}
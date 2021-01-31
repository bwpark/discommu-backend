import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import { UserModel } from "./database/users/users.models";

export let userInfoCache = {}

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
    }
    resolve(data);
});

export const getUser = async (
    userID: string
) => {
    if (!userInfoCache[userID]) return null;
    const userInfo = (await UserModel.find({ discordID: userID }))[0];
    if (!userInfo) return null;
    return {dicordID: userInfo.discordID, permissions: userInfo.permissions, following: userInfo.following, ...userInfoCache[userID]};
}
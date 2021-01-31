import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";

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
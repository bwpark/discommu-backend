import { FieldResolver, Resolver, Root } from "type-graphql";
import { User } from "../types/User";

import { getUser } from "../util";
import { UserModel } from "../database";

@Resolver(User)
export default class {
    @FieldResolver({ nullable: true })
    async id(@Root() parent: User) {
        return parent.id;
    }

    @FieldResolver({ nullable: true })
    async username(@Root() parent: User) {
        return parent.username;
    }

    @FieldResolver({ nullable: true })
    async discriminator(@Root() parent: User) {
        return parent.discriminator;
    }

    @FieldResolver({ nullable: true })
    async avatarURL(@Root() parent: User) {
        return parent.avatarURL;
    }

    @FieldResolver({ nullable: true })
    async permissions(@Root() parent: User) {
        return parent.permissions;
    }

    @FieldResolver({ nullable: true })
    async following(@Root() parent: User) {
        let res = [];

        for (let i: number = 0 ; i < parent.following.length ; i ++) {
            const user = await getUser(parent.following[i]);
            res.push({
                id: user.id,
                discriminator: user.discriminator,
                username: user.username,
                avatarURL: user.avatarURL,
                permissions: user.userInfo.permissions,
                following: user.userInfo.following 
            });
        }

        return res;
    }

    @FieldResolver({ nullable: true })
    async follower(@Root() parent: User) {
        const dbusers = await UserModel.find({})
        let res = [];

        for (const i in dbusers) {
            const user = await getUser(dbusers[i].discordID);
            if (user.userInfo.following.includes(parent.id))
                res.push({
                    id: user.id,
                    discriminator: user.discriminator,
                    username: user.username,
                    avatarURL: user.avatarURL,
                    permissions: user.userInfo.permissions,
                    following: user.userInfo.following 
                });
        }

        return res;
    }
}

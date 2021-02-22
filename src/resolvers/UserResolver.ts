import { FieldResolver, Resolver, Root } from "type-graphql";
import User from "../types/User";

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
        return parent.following;
    }
}

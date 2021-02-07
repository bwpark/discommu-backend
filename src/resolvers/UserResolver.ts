import { FieldResolver, Resolver, Root } from 'type-graphql'
import User from '../types/User'
import { getUser } from '../util'

@Resolver(User)
export default class {
    @FieldResolver({ nullable: true })
    async discriminator(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.discriminator;
    }

    @FieldResolver({ nullable: true })
    async avatarURL(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.avatarURL;
    }

    @FieldResolver({ nullable: true })
    async permissions(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.permissions;
    }

    @FieldResolver({ nullable: true })
    async following(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.following;
    }
}

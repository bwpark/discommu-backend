import { ApolloError } from 'apollo-server-express'
import { Arg, Ctx, FieldResolver, Resolver, Root } from 'type-graphql'
import User from '../types/User'
import { getUser } from '../util'

@Resolver(User)
export default class {
    @FieldResolver()
    async discriminator(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.discriminator;
    }

    @FieldResolver()
    async avatarURL(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.avatarURL;
    }

    @FieldResolver()
    async permissions(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.permissions;
    }

    @FieldResolver()
    async following(@Root() parent: User) {
        const data = await getUser(parent.id);
        if (!data) return null;
        return data.following;
    }
}

import { FieldResolver, Resolver, Root } from 'type-graphql'
import User from '../types/User'
import { getUser } from '../util'

@Resolver(User)
export default class {
    @FieldResolver({ nullable: true })
    async username(@Root() parent: User) {
        console.log(parent)
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

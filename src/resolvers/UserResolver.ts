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

    /*@FieldResolver((returns) => String)
    async description(
        @Ctx() ctx,
        @Root() user: User,
        @Arg('update', { nullable: true }) update?: string,
    ) {
        const data = await getUser(parent.id);
        if (!data) return null;
        if (typeof update !== 'string' || ctx.user?.id !== data.id)
            return data.description
        if (update.length > 50)
            throw new ApolloError(
                '유저 설명은 50자를 넘을 수 없습니다.',
                'ERR_TEXT_TOO_LONG',
            )
        await Util.prisma.user.update({
            data: {
                description: update,
            },
            where: {
                id: data.id,
            },
        })
        return update
    }*/
}

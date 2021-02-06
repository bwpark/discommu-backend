import { ObjectType, Field, Arg, Ctx, Root } from 'type-graphql'

@ObjectType()
class UserMutation {
    @Field(type => Boolean)
    async follow(@Root() rootuser, @Ctx() ctx, @Arg("id") id: string): Promise<Boolean>;

    @Field(type => Boolean)
    async unfollow(@Root() rootuser, @Ctx() ctx, @Arg("id") id: string) {
        return true;
    }
    
    @Field(type => Boolean)
    async addpermission(@Root() rootuser, @Ctx() ctx, @Arg("permission") perm: string) {
        return true;
    }

    @Field(type => Boolean)
    async removepermission(@Root() rootuser, @Ctx() ctx, @Arg("permission") perm: string) {
        return true;
    }
}

export default UserMutation;
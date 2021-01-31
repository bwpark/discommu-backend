import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
class User {
    @Field(type => ID)
    id: string

    @Field()
    discriminator: string

    @Field()
    username: string

    @Field()
    avatarURL: string

    @Field(type => [String])
    permissions: string[]

    @Field(type => [String])
    following: string[]
}

export default User
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export default class User {
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
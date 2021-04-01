import { Field, ID, ObjectType } from "type-graphql";

export type user = {
    id: string,
    discriminator: string,
    username: string,
    avatarURL: string,
    permmissions: string[],
    following: user[],
    follower: string[]
}

@ObjectType()
export class User {
    @Field(type => ID)
    id: string;

    @Field()
    discriminator: string;

    @Field()
    username: string;

    @Field()
    avatarURL: string;

    @Field(type => [String])
    permissions: string[];

    @Field(type => [User])
    following: string[];

    @Field(type => [User])
    follower: string[];
}
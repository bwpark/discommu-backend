import { Field, ObjectType } from "type-graphql";

import { Post, post } from "./Post";
import { User, user } from "./User";

export type category = {
    author: user
    name: string,
    description: string,
    posts: post[]
}

@ObjectType()
export class Category {
    authorID: string;

    @Field()
    name: string;

    @Field(type => User)
    author: user

    @Field()
    description: string;

    @Field(type => [Post])
    posts: post[];
}
import { Field, ObjectType } from "type-graphql";

import { Post, post } from "./Post";

export type category = {
    authorID: string,
    name: string,
    description: string,
    posts: post[]
}

@ObjectType()
export class Category {
    @Field()
    authorID: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(type => [Post])
    posts: post[];
}
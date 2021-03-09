import { Field, ObjectType } from "type-graphql";

import { Post, post } from "./Post";

@ObjectType()
export default class Category {
    @Field()
    authorID: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(type => [Post])
    posts: post[];
}
import { Field, ObjectType } from "type-graphql";

import { User, user } from "./User";

export type comment = {
    _id: string,
    authorID: string,
    content: string,
    timestamp: number,
    reply: string,
    postID: string
}

@ObjectType()
export class Comment {
    authorID: string;

    @Field(type => User)
    author: user

    @Field()
    _id: string;

    @Field()
    content: string;

    @Field()
    timestamp: number;

    @Field()
    reply: string;

    @Field()
    postID: string;
}
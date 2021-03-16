import { Field, ObjectType, ID } from "type-graphql";

import { Comment, comment } from "./Comment";
import { User, user } from "./User";

export type post = {
    _id: string,
    authorID: string,
    title: string,
    content: string,
    category: string,
    timestamp: number,
    views: number,
    tag: string[],
    hearts: string[],
    comments: comment[]
}

@ObjectType()
export class Post {
    authorID: string;

    @Field(type => ID)
    _id: string;

    @Field(type => User)
    author: user

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    category: string;

    @Field()
    timestamp: number;

    @Field()
    views: number;

    @Field(type => [String])
    tag: string[];

    @Field(type => [String])
    hearts: string[];

    @Field(type => [Comment])
    comments: comment[];
}
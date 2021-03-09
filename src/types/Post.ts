import { Field, ObjectType, ID } from "type-graphql";
import { Comment, comment } from "./Comment";

export type post = {
    _id: string,
    authorID: string,
    title: string,
    content: string,
    category: string,
    timestamp: number,
    tag: string[],
    hearts: string[],
    comments: comment[]
}

@ObjectType()
export class Post {
    @Field(type => ID)
    _id: string;

    @Field()
    authorID: string;

    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    category: string;

    @Field()
    timestamp: number;

    @Field(type => [String])
    tag: string[];

    @Field(type => [String])
    hearts: string[];

    @Field(type => [Comment])
    comments: comment[];
}
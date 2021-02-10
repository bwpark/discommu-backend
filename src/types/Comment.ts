import { Field, ObjectType } from "type-graphql";

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
    @Field()
    authorID: string

    @Field()
    _id: string

    @Field()
    content: string

    @Field()
    timestamp: number

    @Field()
    reply: string

    @Field()
    postID: string
}
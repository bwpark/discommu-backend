import { Field, ObjectType, ID } from 'type-graphql'

type comment = {
    _id: string,
    authorID: string,
    content: string,
    timestamp: number,
    reply: string
}

@ObjectType()
class Comment {
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
}

@ObjectType()
export default class Post {
    @Field(type => ID)
    _id: string

    @Field()
    authorID: string

    @Field()
    title: string

    @Field()
    content: string

    @Field()
    category: string

    @Field()
    timestamp: number

    @Field(type => [String])
    tag: string[]

    @Field(type => [String])
    hearts: string[]

    @Field(type => [Comment])
    comments: comment[]
}
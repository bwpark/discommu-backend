import { Field, ObjectType } from 'type-graphql'

type comment = {
    commentID: string,
    authorID: string,
    comment: string
}

@ObjectType()
class Comment {
    @Field()
    authorID: string

    @Field()
    commentID: string

    @Field()
    comment: string
}

@ObjectType()
export default class Post {
    @Field()
    author: string

    @Field()
    title: string

    @Field()
    content: string

    @Field()
    category: string

    @Field(type => [String])
    tag: string[]

    @Field(type => [String])
    hearts: string[]

    @Field(type => [Comment])
    comments: comment[]
}
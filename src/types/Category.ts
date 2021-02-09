import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Category {
    @Field()
    authorID: string

    @Field()
    name: string

    @Field()
    description: string
}
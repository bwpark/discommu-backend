import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export default class Category {
    @Field()
    author: string

    @Field()
    name: string

    @Field()
    description: string
}
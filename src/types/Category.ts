import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class Category {
    @Field()
    authorID: string

    @Field()
    name: string

    @Field()
    description: string
}

export default Category;
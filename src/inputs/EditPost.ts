import { Field, InputType } from "type-graphql";

@InputType()
export default class EditCategory {
    @Field()
    title: string

    @Field()
    content: string

    @Field(type => [String], { nullable: true })
    tag: string[]
}
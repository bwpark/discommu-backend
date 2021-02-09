import { Field, InputType } from "type-graphql";

@InputType()
export default class EditCategory {
    @Field()
    content: string

    @Field(type => [String])
    tag: string[]
}
import { Field, InputType } from "type-graphql";

@InputType()
export default class AddPost {
    @Field()
    title: string;

    @Field()
    content: string;

    @Field()
    category: string;

    @Field(type => [String], { nullable: true })
    tag: string[];
}
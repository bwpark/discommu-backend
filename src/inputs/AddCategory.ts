import { Field, InputType } from "type-graphql";

@InputType()
export default class AddCategory {
    @Field()
    name: string;

    @Field()
    description: string;
}
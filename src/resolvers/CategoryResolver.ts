import { FieldResolver, Resolver, Root } from "type-graphql";
import Category from "../types/Category";

@Resolver(Category)
export default class {
    @FieldResolver()
    async authorID(@Root() parent: Category) {
        return parent.authorID;
    }

    @FieldResolver()
    async name(@Root() parent: Category) {
        return parent.name;
    }

    @FieldResolver()
    async description(@Root() parent: Category) {
        return parent.description;
    }
}

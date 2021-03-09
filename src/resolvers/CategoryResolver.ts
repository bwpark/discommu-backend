import { FieldResolver, Resolver, Root } from "type-graphql";
import { PostModel } from "../database";

import { Category } from "../types/Category";

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

    @FieldResolver()
    async posts(@Root() parent: Category) {
        const res = await PostModel.find({ category: parent.name })
        return res.map(r => r._doc);
    }
}

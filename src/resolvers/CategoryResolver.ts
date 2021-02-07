import { FieldResolver, Resolver, Root } from 'type-graphql'
import Category from '../types/Category'

@Resolver(Category)
export default class {
    @FieldResolver()
    async author(@Root() parent: Category) {
        return parent.author;
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

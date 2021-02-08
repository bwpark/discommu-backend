import { FieldResolver, Resolver, Root } from 'type-graphql'
import Post from '../types/Post'

@Resolver(Post)
export default class {
    @FieldResolver()
    async author(@Root() parent: Post) {
        return parent.author;
    }

    @FieldResolver()
    async title(@Root() parent: Post) {
        return parent.title;
    }

    @FieldResolver()
    async content(@Root() parent: Post) {
        return parent.content;
    }

    @FieldResolver()
    async category(@Root() parent: Post) {
        return parent.category;
    }

    @FieldResolver()
    async tag(@Root() parent: Post) {
        return parent.tag;
    }

    @FieldResolver()
    async hearts(@Root() parent: Post) {
        return parent.hearts;
    }

    @FieldResolver()
    async comments(@Root() parent: Post) {
        return parent.comments;
    }
}

import { FieldResolver, Resolver, Root } from 'type-graphql'
import { Comment } from '../types/Comment'

@Resolver(Comment)
export default class {
    @FieldResolver()
    async authorID(@Root() parent: Comment) {
        return parent.authorID;
    }

    @FieldResolver()
    async reply(@Root() parent: Comment) {
        return parent.reply;
    }

    @FieldResolver()
    async content(@Root() parent: Comment) {
        return parent.content;
    }

    @FieldResolver()
    async _id(@Root() parent: Comment) {
        return parent._id;
    }

    @FieldResolver()
    async timestamp(@Root() parent: Comment) {
        return parent.timestamp;
    }

    @FieldResolver()
    async postID(@Root() parent: Comment) {
        return parent.postID;
    }
}

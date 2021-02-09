import { Schema } from "mongoose";

import { findByTag, searchPosts } from "./posts.statics";
import { addHeart, removeHeart } from "./posts.methods";
import { IPostDocument, IPostModel } from "./posts.types";

const PostSchema = new Schema<IPostDocument, IPostModel>({
    authorID: String,
    title: String,
    content: String,
    category: String,
    timestamp: Number,

    tag: {
        type: Array,
        default: []
    },
    hearts: {
        type: Array,
        default: []
    }
});

PostSchema.statics.findByTag = findByTag;
PostSchema.statics.searchPosts = searchPosts;

PostSchema.methods.addHeart = addHeart;
PostSchema.methods.removeHeart = removeHeart;

export default PostSchema;
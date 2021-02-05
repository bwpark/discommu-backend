import { Schema } from "mongoose";

import { findByTag, searchPosts } from "./posts.statics";
import { editContent } from "./posts.methods";
import { IPostDocument, IPostModel } from "./posts.types";

const PostSchema = new Schema<IPostDocument, IPostModel>({
    authorID: String,
    title: String,
    content: String,
    category: String,

    tag: {
        type: Array,
        default: []
    },
    hearts: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
});

PostSchema.statics.findByTag = findByTag;
PostSchema.statics.searchPosts = searchPosts;
PostSchema.methods.editContent = editContent;

export default PostSchema;
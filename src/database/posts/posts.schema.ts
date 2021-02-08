import { Schema } from "mongoose";

import { findByTag, searchPosts } from "./posts.statics";
import { editContent, getComment, addComment, editComment, removeComment, addTag, removeTag, addHeart, removeHeart } from "./posts.methods";
import { IPostDocument, IPostModel } from "./posts.types";
import Post from "../../types/Post";

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
PostSchema.methods.getComment = getComment;
PostSchema.methods.addComment = addComment;
PostSchema.methods.editComment = editComment;
PostSchema.methods.removeComment = removeComment;
PostSchema.methods.addTag = addTag;
PostSchema.methods.removeTag = removeTag;
PostSchema.methods.addHeart = addHeart;
PostSchema.methods.removeHeart = removeHeart;

export default PostSchema;
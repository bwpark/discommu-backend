import { Schema } from "mongoose";

import { findByPost } from "./comments.statics";
import { editContent } from "./comments.methods";
import { ICommentDocument, ICommentModel } from "./comments.types";

const CommentSchema = new Schema<ICommentDocument, ICommentModel>({
    authorID: String,
    content: String,
    timestamp: Number,
    reply: String,
    postID: String
});

CommentSchema.statics.findByPost = findByPost;
CommentSchema.methods.editContent = editContent;

export default CommentSchema;
import { Document, Model } from "mongoose"

export interface IComment {
    authorID: string;
    content: string;
    timestamp: number;
    reply: string; // 답장 유저 ID
    postID: string; // Post의 _id
}

export interface ICommentDocument extends Document, IComment {
    editContent: (this: ICommentDocument, content: string) => Promise<void>;
};

export interface ICommentModel extends Model<ICommentDocument> {
    findByPost: (postID: string) => Promise<Array<ICommentDocument>>;
};
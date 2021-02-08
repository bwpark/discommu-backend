import { Document, Model } from "mongoose"

type comment = {
    authorID: string,
    comment: string,
    commentID: string
}

export interface IPost {
    authorID: string;
    title: string;
    content: string;
    category: string;

    tag?: string[];
    hearts?: string[];
    comments?: comment[];
}

export interface IPostDocument extends Document, IPost {
    editContent: (this: IPostDocument, content: string) => Promise<void>;
    addTag: (this: IPostDocument, tag: string) => Promise<void>;
    removeTag: (this: IPostDocument, tag: string) => Promise<void>;
    addHeart: (this: IPostDocument, userID: string) => Promise<void>;
    removeHeart: (this: IPostDocument, userID: string) => Promise<void>;
    addComment: (this: IPostDocument, userID: string, content: string) => Promise<string>;
    getComment: (this: IPostDocument, commentID: string) => Promise<string>;
    editComment: (this: IPostDocument, commentID: string, authorID: string) => Promise<void>;
    removeComment: (this: IPostDocument, commentID: string, authorID: string, content: string) => Promise<void>;
};

export interface IPostModel extends Model<IPostDocument> {
    findByTag: (tag: string) => Promise<Array<IPostDocument>>;
    searchPosts: (query: string) => Promise<Array<IPostDocument>>;
};
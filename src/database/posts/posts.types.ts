import { Document, Model } from "mongoose"

export interface IPost {
    authorID: string;
    title: string;
    content: string;
    category: string;

    tag?: string[];
    hearts?: string[];
    comments?: object[];
}

export interface IPostDocument extends Document, IPost {
    editContent: (this: IPostDocument, content: string) => Promise<void>;
};

export interface IPostModel extends Model<IPostDocument> {
    findByTag: (tag: string) => Promise<Array<IPostDocument>>;
    searchPosts: (query: string) => Promise<Array<IPostDocument>>;
};
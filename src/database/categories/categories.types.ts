import { Document, Model } from "mongoose"

export interface ICategory {
    authorID: string;
    name: string;
    description: string;
}

export interface ICategoryDocument extends Document, ICategory {
    editDescription: (this: ICategoryDocument, description: string) => Promise<void>;
};

export interface ICategoryModel extends Model<ICategoryDocument> {};
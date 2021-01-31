import { Document, Model } from "mongoose"

export interface IUser {
    discordID: string;
    point?: number;
    permissions?: string[];
    following?: string[];
}

export interface IUserDocument extends Document, IUser {
    addFollowing: (this: IUserModel, userID: string) => Promise<void>;
    removeFollowing: (this: IUserModel, userID: string) => Promise<void>;
    addPermissions: (this: IUserModel, permission: string) => Promise<void>;
    removePermissions: (this: IUserModel, permission: string) => Promise<void>;
};

export interface IUserModel extends Model<IUserDocument> {
    findOneOrCreate: (data: IUser) => Promise<IUserDocument>;
};
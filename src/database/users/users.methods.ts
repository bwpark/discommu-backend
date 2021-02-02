import { IUserDocument } from "./users.types";

import config from "../../../config.json";

export async function addFollowing(this: IUserDocument, userID: string): Promise<void> {
    if (this.following?.includes(userID)) return;
    this.following?.push(userID);
    await this.save();
}

export async function removeFollowing(this: IUserDocument, userID: string): Promise<void> {
    if (!this.following?.includes(userID)) return;
    this.following = this.following?.filter(i => i !== userID);
    await this.save();
}

export async function addPermissions(this: IUserDocument, permission: string): Promise<void> {
    if (!config.permissions.includes(permission)) return;
    if (this.permissions?.includes(permission)) return;
    this.permissions?.push(permission);
    await this.save();
}

export async function removePermissions(this: IUserDocument, permission: string): Promise<void> {
    if (!config.permissions.includes(permission)) return;
    if (!this.permissions?.includes(permission)) return;
    this.permissions = this.following?.filter(i => i !== permission);
    await this.save();
}
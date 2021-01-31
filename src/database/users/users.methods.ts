import { IUserDocument } from "./users.types";

export async function addFollowing(this: IUserDocument, userID: string): Promise<void> {
    if (this.following?.includes(userID)) return;
    this.following?.push(userID);
}

export async function removeFollowing(this: IUserDocument, userID: string): Promise<void> {
    if (!this.following?.includes(userID)) return;
    this.following = this.following?.filter(i => i !== userID);
}

export async function addPermissions(this: IUserDocument, permission: string): Promise<void> {
    if (this.permissions?.includes(permission)) return;
    this.permissions?.push(permission);
}

export async function removePermissions(this: IUserDocument, permission: string): Promise<void> {
    if (!this.permissions?.includes(permission)) return;
    this.permissions = this.following?.filter(i => i !== permission);
}
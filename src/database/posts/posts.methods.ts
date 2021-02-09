import { IPostDocument } from "./posts.types";

export async function addHeart(this: IPostDocument, userID: string): Promise<void> {
    if (this.hearts?.includes(userID)) return;
    this.hearts?.push(userID);
    await this.save();
}

export async function removeHeart(this: IPostDocument, userID: string): Promise<void> {
    if (!this.hearts?.includes(userID)) return;
    this.hearts = this.hearts?.filter(i => i !== userID);
    await this.save();
}
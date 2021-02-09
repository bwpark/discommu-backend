import { IPostDocument } from "./posts.types";

export async function editContent(this: IPostDocument, content: string): Promise<void> {
    this.content = content;
    await this.save();
}

export async function addTag(this: IPostDocument, tag: string): Promise<void> {
    if (this.tag?.includes(tag)) return;
    this.tag?.push(tag);
    await this.save();
}

export async function removeTag(this: IPostDocument, tag: string): Promise<void> {
    if (!this.tag?.includes(tag)) return;
    this.tag = this.tag?.filter(i => i !== tag);
    await this.save();
}

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
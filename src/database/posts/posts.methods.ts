import { IPostDocument } from "./posts.types";

export async function editContent(this: IPostDocument, content: string): Promise<void> {
    this.content = content;
    await this.save();
}
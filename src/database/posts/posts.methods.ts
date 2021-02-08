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

export async function addComment(this: IPostDocument, userID: string, content: string): Promise<string> {
    const randID = () => {
        const randCh = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return randCh() + randCh() + randCh() + randCh();
    }
    const commentID = randID();
    this.comments?.push({ commentID: commentID, authorID: userID, comment: content });
    await this.save();
    return commentID;
}

export async function getComment(this: IPostDocument, commentID: string): Promise<string> {
    for (const i in this.comments) {
        if (this.comments[i].commentID === commentID) return i;
    }
}

export async function removeComment(this: IPostDocument, commentID: string, authorID: string): Promise<void> {
    const commentNum = await this.getComment(commentID);
    if (!this.comments[commentNum]) return;
    if (this.comments[commentNum].authorID !== authorID) return;

    delete this.comments[commentNum];
    await this.save();
}

export async function editComment(this: IPostDocument, commentID: string, authorID: string, content: string): Promise<void> {
    const commentNum = await this.getComment(commentID);
    if (!this.comments[commentNum]) return;
    if (this.comments[commentNum].authorID !== authorID) return;

    this.comments[commentNum].comment = content;
    await this.save();
}
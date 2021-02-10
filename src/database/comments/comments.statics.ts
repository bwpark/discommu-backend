import { ICommentModel } from "./comments.types";

export async function findByPost(
    this: ICommentModel,
    postID: string
): Promise<Array<any>> {
    const res = await this.find({ postID: postID });
    if (!res) return [];
    return res;
}
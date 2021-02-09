import { ICommentDocument, ICommentModel } from "./comments.types";

export async function findByPost(
    this: ICommentModel,
    postID: string
): Promise<Array<ICommentDocument>> {
    return await this.find({ postID: postID });
}
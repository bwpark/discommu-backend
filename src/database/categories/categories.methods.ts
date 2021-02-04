import { ICategoryDocument } from "./categories.types";

export async function editDescription(this: ICategoryDocument, description: string): Promise<void> {
    this.description = description;
    await this.save();
}
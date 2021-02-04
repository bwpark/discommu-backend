import { ICategoryDocument, ICategoryModel, ICategory } from "./categories.types";

export async function findOneOrCreate(
    this: ICategoryModel,
    data: ICategory
): Promise<ICategoryDocument> {
    const record = await this.findOne(data);
    if (record) return record;
    else return this.create(data);
}

import { Schema } from "mongoose";

import { editDescription } from "./categories.methods";
import { ICategoryDocument, ICategoryModel } from "./categories.types";

const CategorySchema = new Schema<ICategoryDocument, ICategoryModel>({
    authorID: String,
    name: String,
    description: String
});
CategorySchema.index({ name: 'text', description: 'text'})

CategorySchema.methods.editDescription = editDescription;

export default CategorySchema;
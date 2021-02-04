import { Schema } from "mongoose";

import { findOneOrCreate } from "./categories.statics";
import { editDescription } from "./categories.methods";
import { ICategoryDocument, ICategoryModel } from "./categories.types";

const CategorySchema = new Schema<ICategoryDocument, ICategoryModel>({
    authorID: String,
    name: String,
    description: String
});

CategorySchema.statics.findOneOrCreate = findOneOrCreate;
CategorySchema.methods.editDescription = editDescription;

export default CategorySchema;
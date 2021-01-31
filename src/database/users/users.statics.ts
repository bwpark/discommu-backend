import UserSchema from "./users.schema";
import { IUserDocument, IUserModel, IUser } from "./users.types";

export async function findOneOrCreate(
    this: IUserModel,
    data: IUser
): Promise<IUserDocument> {
    const record = await this.findOne(data);
    if (record) return record;
    else return this.create(data);
}

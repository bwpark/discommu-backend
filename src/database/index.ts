import Mongoose from "mongoose";
import config from '../../config.json'

export { CategoryModel } from './categories/categories.models'
export { PostModel } from './posts/posts.models'
export { UserModel } from './users/users.models'

export let db: Mongoose.Connection;

export const connect = () => {
    if (db) disconnect();

    Mongoose.connect(`mongodb+srv://admin:${config.db.password}@${config.db.url}/discommu?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    db = Mongoose.connection;
    db.once("open", async () => {
        console.log("LOG> Database Ready");
    });
    db.on("error", () => {
        console.log("LOG> Database Connection error");
    });
}

export const disconnect = () => {
    if (!db) return;
    Mongoose.disconnect();
    console.log("LOG> Database Disconnect");
}
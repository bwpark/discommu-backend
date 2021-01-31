import Mongoose from "mongoose";
import config from '../../config.json'

let database: Mongoose.Connection;

export const connect = () => {
    if (database) return;

    Mongoose.connect(`mongodb+srv://admin:${config.db.password}@${config.db.url}/discommu?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    database = Mongoose.connection;
    database.once("open", async () => {
        console.log("LOG> Database Ready");
    });
    database.on("error", () => {
        console.log("LOG> Database Connection error");
    });
}

export const disconnect = () => {
    if (!database) return;
    Mongoose.disconnect();
    console.log("LOG> Database Disconnect");
}
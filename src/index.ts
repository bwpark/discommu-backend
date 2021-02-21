import "reflect-metadata";

import Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { verify } from "jsonwebtoken";

import { connect, disconnect } from "./database";
import { getUser } from "./util";
import config from "../config.json";

import DefaultResolver from "./resolvers/DefaultResolver";
import MutationResolver from "./resolvers/MutationResolver";
import UserResolver from "./resolvers/UserResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import PostResolver from "./resolvers/PostResolver";
import CommentResolver from "./resolvers/CommentResolver";

process.on("exit", () => {
    disconnect();
    console.log("Bye");
});

(async () => {
    const schema = await buildSchema({
        resolvers: [
            DefaultResolver, MutationResolver, UserResolver,
            CategoryResolver, PostResolver, CommentResolver
        ],
    });

    const apollo = new ApolloServer({
        schema,
        context: async ({ req }) => {
            let res: any = {};

            if (!req.headers.authorization) return null;
            if (!req.headers.authorization.startsWith("Bearer ")) return null;
            const token = req.headers.authorization.slice("Bearer ".length);

            try { res.user = verify(token, config.jwtSecret) }
            catch { return null }; 

            const data = await getUser(res.user.id);
            if (!data) return null;
            return { user: data }; 
        },
        logger: {  
            warn(message?: any) {
                console.warn(message);
            },
            debug(message?: any) {
                console.debug(message);
            },
            error(message?: any) {
                console.error(message);
            },
            info(message?: any) {
                console.info(message);
            }
        }
    });

    const app: Express.Application = Express();

    apollo.applyMiddleware({ app });
    app.listen(config.port || 3000);
    connect();
    console.log("LOG> Server Start");
})()

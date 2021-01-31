import "reflect-metadata";

import Express from "express";
import DefaultResolver from "./resolvers/DefaultResolver";
import UserResolver from "./resolvers/UserResolver"
import { connect } from "./database";
import config from "../config.json";


import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { verify } from 'jsonwebtoken'
import { getUser } from './util'

(async () => {
    const schema = await buildSchema({
        resolvers: [DefaultResolver, UserResolver],
    });

    const apollo = new ApolloServer({
        schema,
        context: async ({ req }) => {
            let res: any = {};

            if (!req.headers.authorization) return null;
            if (!req.headers.authorization.startsWith('Bearer ')) return null;
            const token = req.headers.authorization.slice('Bearer '.length);

            try { res.user = verify(token, config.jwtSecret) }
            catch { return null }

            const data = await getUser(res.user.id);
            if (!data) return null;

            return res;
        }
    });

    const app: Express.Application = Express();

    apollo.applyMiddleware({ app });
    app.listen(config.port || 8080);
    connect();
    console.log("LOG> Server Start")
})()

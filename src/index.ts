import "reflect-metadata";

import Express from "express";
import DefaultResolver from "./resolvers/DefaultResolver";
import { connect } from "./database";
import config from "../config.json";


import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

(async () => {
    const schema = await buildSchema({
        resolvers: [DefaultResolver],
    });

    const apollo = new ApolloServer({
        schema
    });

    const app: Express.Application = Express();

    apollo.applyMiddleware({ app });
    app.listen(config.port || 8080);
    connect();
    console.log("LOG> Server Start")
})()

import "reflect-metadata";
import Express from "express";
import { buildSchema } from "type-graphql";
import DefaultResolver from "./resolvers/DefaultResolver";
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
    app.listen(process.env.PORT || 8080);
})()

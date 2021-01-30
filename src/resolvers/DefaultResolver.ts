import { Resolver, Query } from "type-graphql";

@Resolver()
export default class {
    @Query(returns => String)
    hello() {
        return "Hello, World!";
    }
}

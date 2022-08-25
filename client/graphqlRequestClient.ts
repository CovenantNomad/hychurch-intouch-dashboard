import { GraphQLClient } from "graphql-request";

const graphlqlRequestClient = new GraphQLClient("http://hychurch.duckdns.org:3000/graphql")

export default graphlqlRequestClient
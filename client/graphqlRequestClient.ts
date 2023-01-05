import { GraphQLClient } from "graphql-request";



const graphlqlRequestClient = new GraphQLClient(process.env.NODE_ENV === 'production' ? "https://hychurch-server.duckdns.org:3000/graphql": "http://localhost:3000/api")
// const graphlqlRequestClient = new GraphQLClient(process.env.NODE_ENV === 'production' ? "https://hychurch-server.duckdns.org:3000/graphql": "https://hychurch-dev.duckdns.org:3000/graphql")

export default graphlqlRequestClient
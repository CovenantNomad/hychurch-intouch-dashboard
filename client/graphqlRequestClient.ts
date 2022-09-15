import { GraphQLClient } from "graphql-request";



const graphlqlRequestClient = new GraphQLClient(process.env.NODE_ENV === 'production' ? "https://hychurch.duckdns.org:3000/graphql": "http://localhost:3000/api")

export default graphlqlRequestClient
import { GraphQLClient } from "graphql-request";


const graphlqlRequestClient = new GraphQLClient("http://hychurch.duckdns.org:3000/graphql", {
  headers: {
    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY1NzI5ODYxMiwiZXhwIjoxNjg4ODM0NjEyfQ.UvCTmAltHl9EQ4r1iQu5I36PL0C5q4iqN2hSaJQWjDU"
  }
})

export default graphlqlRequestClient
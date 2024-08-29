import { GraphQLClient } from "graphql-request";

const graphqlEndpoint =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? 'https://server.newboard.app/graphql'
    : process.env.NODE_ENV === 'production'
      ? 'https://server.newboard.io/graphql'
      : 'http://localhost:8001/graphql';


// const graphqlEndpoint='https://server.newboard.app/graphql'


// const graphqlEndpoint='http://localhost:8000/graphql'


// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbHd6ZDhycGQwMDAwOHdkYnpxdjZ2c3N1IiwiZW1haWwiOiJzYWhpbGNoYWxrZTEwMTFAZ21haWwuY29tIiwicm9sZSI6Ik9XTkVSIiwiaWF0IjoxNzIxNjYwNzA0fQ.kxkNFiYWeLwvoOkNF1eJrxgOGL7Dh587oq-J9GMtluM'

const isClient = typeof window !== "undefined";

let Token= typeof localStorage !== "undefined" && localStorage.getItem('token')
// console.log("tokennn",Token)
export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
  headers: () => ({
    Authorization: isClient
      // ? `Bearer ${token}`
      ? `Bearer ${typeof localStorage !== "undefined" && localStorage.getItem('token')}`
      : "",
  }),
});

export const fetchGraphQLData = async (query, variables = {}) => {
  try {
    const data = await graphqlClient.request(query, variables);
    return data;
  } catch (error) {
    console.error('GraphQL request error:', error);
    throw error;
  }
};






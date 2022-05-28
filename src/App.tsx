import React from 'react';
import { ApolloProvider, gql , useQuery } from "@apollo/client"

const ME = gql`
  query me {
    user(login: "TakayaSugiyama"){
      name
      avatarUrl
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(ME)
  if (loading) return <p>loading</p>
  console.log({data})
  return (
    <div>{data.user.name}</div>
  );
}

export default App;

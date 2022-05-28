import React from 'react';
import { gql , useQuery } from "@apollo/client"
import { ME } from "./graphql"

function App() {
  const { loading, error, data } = useQuery(ME)
  if (loading) return <p>loading</p>
  if (error) return <p>{ error.message }</p>
  return (
    <div>{data.user.name}</div>
  );
}

export default App;

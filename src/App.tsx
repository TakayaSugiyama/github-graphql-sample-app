import React from 'react';
import { useQuery } from "@apollo/client"
import { ME, searchRepository } from "./graphql"

const VARIABLES = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: "フロントエンドエンジニア"
}

function App() {
  const { loading, error, data } = useQuery(searchRepository, { variables: { ...VARIABLES } })
  if (loading) return <p>loading</p>
  if (error) return <p>{ error.message }</p>
  console.log(data)
  return (
    <div></div>
  );
}

export default App;

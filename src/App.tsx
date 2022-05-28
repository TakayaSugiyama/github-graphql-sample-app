import React, { useState } from 'react';
import { useQuery } from "@apollo/client"
import { ME, searchRepository } from "./graphql"

const VARIABLES = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: ""
}

function App() {
  const [query, setQuery] = useState("Ruby on Rails")
  const { loading, error, data } = useQuery(searchRepository, { variables: { ...VARIABLES, query: query } })
  if (error) return <p>{ error.message }</p>
  console.log(data)
  return (
    <div>
      <form>
        <input onChange={(e) => setQuery(e.target.value)} value={query}/>
      </form>
    </div>
  );
}

export default App;

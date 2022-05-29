import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import { searchRepository } from "./graphql"
import { Data } from "./type"

const DEFAULT_STATUS = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: ""
}

function App() {
  const [query, setQuery] = useState("Ruby on Rails")

  const { error, data } = useQuery(searchRepository, { variables: { ...DEFAULT_STATUS, query: query }})

  const fetchApiData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const repoCount = data === undefined ? 0 : data.search.repositoryCount
  const repoUnit = repoCount === 1 ? "Repository" : "Repositories"
  const title = `GitHub Repositories Search Result ${repoCount} ${repoUnit}`

  console.log(data)

  if (error) return <p>{ error.message }</p>
  return (
    <div>
      <form>
        <input onChange={(e) =>fetchApiData(e)} value={query}/>
      </form>
      <h1>{ title }</h1>
    </div>
  );
}

export default App;

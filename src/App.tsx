import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import { searchRepository } from "./graphql"

const DEFAULT_STATUS = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: ""
}

function App() {
  const [query, setQuery] = useState("")

  const { error, data } = useQuery(searchRepository, { variables: { ...DEFAULT_STATUS, query: query }})

  const fetchApiData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const repoCount = data === undefined ? 0 : data.search.repositoryCount
  const repoUnit = repoCount === 1 ? "Repository" : "Repositories"
  const title = `GitHub Repositories Search Result ${repoCount} ${repoUnit}`

  if (error) return <p>{ error.message }</p>
  return (
    <div>
      <form>
        <input onChange={(e) =>fetchApiData(e)} value={query}/>
      </form>
      { data === undefined ? <p>loading...</p> : <h1>{title}</h1> }
      <ul>
        {
          data !== undefined  && data.search.edges.map((edge: any) => <li key={edge.node.id}><a href={edge.node.url} target="_blank">{ edge.node.name }</a></li>)
        }
      </ul>
    </div>
  );
}

export default App;

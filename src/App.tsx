import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import { searchRepository } from "./graphql"

const PER_PAGE = 5

const StarButton = (props: any) => {
  if(props.node === undefined) return <button></button>
  const starCount = props.node.stargazers.totalCount
  return <button>{ starCount === 1 ? "1 star": `${starCount} stars` }</button>
}

const DEFAULT_STATUS = {
  after: null,
  before: null,
  first: PER_PAGE,
  last: null,
}

function App() {
  const [query, setQuery] = useState("")
  const [pageInfo, setPageInfo] = useState<any>({...DEFAULT_STATUS})

  const { error, data } = useQuery(searchRepository, { variables: { ...pageInfo, query: query }})

  const fetchApiData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const nextButton = () => {
    setPageInfo({
      after: data.search.pageInfo.endCursor,
      before: null,
      first: PER_PAGE,
      last: null,
    })
  }

  const previousButton = () => {
    setPageInfo({
      after: null,
      before: data.search.pageInfo.startCursor,
      first: null,
      last: PER_PAGE,
    })
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
          data !== undefined  && data.search.edges.map((edge: any) => {
            return (
              <li key={edge.node.id}>
                <a href={edge.node.url} target="_blank" rel="noopener noreferrer">{ edge.node.name }</a>
                <StarButton node={edge.node}/>
              </li>
            )
        })
        }
      </ul>
      { data !== undefined && data.search.pageInfo.hasPreviousPage ? <button onClick={previousButton}>Previous</button>  : null}
      { data !== undefined && data.search.pageInfo.hasNextPage ? <button onClick={nextButton}>Next</button>  : null}
    </div>
  );
}

export default App;

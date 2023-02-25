import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import apiClient from "../http-common.js"
import Summary from "./summary"

export const useCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: () => apiClient.get("/people").then((res) => res.data.results),
    // staleTime: 5000,
    // cacheTime: 1000,
  })
}

export const useSearchCharaters = (target) =>
  useQuery({
    queryKey: [target],
    queryFn: () =>
      apiClient.get(`people/?search=${target}`).then((res) => res.data.results),
  })

const Characters = () => {
  // local states ------------------------------------------
  const [target, setTarget] = useState("")

  // queries ------------------------------------------------
  const { data, isLoading, error } = useCharacters()
  const {
    data: searchData,
    isLoading: searchIsLoading,
    error: searchError,
  } = useSearchCharaters(target)

  // renders -----------------------------------------------
  let displayedList = target.length
    ? searchData?.map((i) => <p key={i.name}>{i.name}</p>)
    : data?.map((i) => <p key={i.name}>{i.name}</p>)

  let content = displayedList

  if (isLoading) {
    content = <h3>Loading...</h3>
  } else if (error || searchError) {
    content = <h3>{`😓 Something went wrong: ${error.message}`}</h3>
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <p>Search for: </p>
        <input value={target} onChange={(e) => setTarget(e.target.value)} />
      </div>
      {(searchIsLoading || isLoading) && <h3>🔃Loading...🔃</h3>}
      {content}
      {!target.length && <Summary />}
    </>
  )
}

export default Characters

import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { get } from "../http-common.js"
import Summary from "./summary"
import { CancelToken } from "axios"

export const useCharacters = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: () => get("/people").then((res) => res.data.results),
    // staleTime: 5000,
    // cacheTime: 1000,
  })
}

export const useSearchCharacters = (target) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["search", target],
    queryFn: () => {
      const source = CancelToken.source()
      const promise = get(`people/?search=${target}`, {
        cancelToken: source.token,
      })
        .then((res) => res.data.results)
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("Request cancelled by user")
          } else {
            throw error
          }
        })

      promise.cancel = () => {
        source.cancel("Query was cancelled by React Query")
      }

      return promise
    },
    enabled: Boolean(target),
    retry: 1,
  })

  return {
    data,
    isLoading,
    error: isError ? "😓 Something went wrong." : error,
  }
}

const Characters = () => {
  // local states ------------------------------------------
  const [target, setTarget] = useState("")

  // queries ------------------------------------------------
  const { data, isLoading, error } = useCharacters()
  const {
    data: searchData,
    isLoading: searchIsLoading,
    error: searchError,
  } = useSearchCharacters(target)

  // renders -----------------------------------------------
  const charactersList = useMemo(() => {
    return target.length ? searchData ?? [] : data ?? []
  }, [data, searchData, target])

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
      {isLoading ? (
        <h3>🔃 Loading... 🔃</h3>
      ) : (
        charactersList.map((character) => (
          <p key={character.name}>{character.name}</p>
        ))
      )}
      {error || searchError ? (
        <h3>{`😓 Something went wrong: ${
          error?.message ?? searchError?.message
        }`}</h3>
      ) : null}
    </>
  )
}

export default Characters

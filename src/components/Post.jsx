import { QueryCache, useQuery } from "@tanstack/react-query"
import axios from "axios"

const Post = ({ id, onBack }) => {
  const queryCache = new QueryCache()

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.data),
    initialData: queryCache
      .find({ queryKey: ["posts"] })
      ?.find((p) => p.id === id),
  })

  return (
    <div>
      <button onClick={onBack}>{"<"} Back</button>
      <h4>{post?.title}</h4>
      <p>{post?.body}</p>
    </div>
  )
}

export default Post

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import Post from "./Post"

const email = "Sincere@april.biz"

const Posts = () => {
  // queries ----------------------------------------------
  const {
    data: user,
    isLoading: userIsLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/users?email=${email}`)
        .then((res) => res.data[0]),
  })

  const {
    data: posts,
    isLoading: postsIsLoading,
    error: postsError,
    isIdle,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        .then((res) => res.data),
    enabled: Boolean(user?.id),
  })

  // local states ------------------------------------------
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <div>
      {userError || postsError ? (
        `😓 Something went wrong: ${userError ?? postsError}`
      ) : userIsLoading ? (
        <p>🔃Loading...🔃</p>
      ) : (
        <div>
          <h4>
            {user.name} ({user.email})
          </h4>
          {isIdle ? null : postsIsLoading ? (
            <p>🔃Loading...🔃</p>
          ) : selectedPost ? (
            <Post id={selectedPost} onBack={() => setSelectedPost(null)} />
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <a href="#" onClick={() => setSelectedPost(post.id)}>
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Posts

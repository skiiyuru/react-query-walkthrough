import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const email = "Sincere@april.biz"

const User = () => {
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
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default User

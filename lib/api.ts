import { User, UsersResponse, Post, PostsResponse, Todo, TodosResponse } from "@/types/user"

const BASE_URL = "https://dummyjson.com"

export async function fetchUsers(options?: {
  limit?: number
  skip?: number
  search?: string
}): Promise<UsersResponse> {
  const { limit = 0, skip = 0, search } = options || {}

  let url: string
  if (search && search.trim().length > 0) {
    url = `${BASE_URL}/users/search?q=${encodeURIComponent(search.trim())}`
  } else {
    // When limit is 0, DummyJSON returns all users (currently 208)
    url = `${BASE_URL}/users?limit=${limit}&skip=${skip}`
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch users: HTTP ${res.status} ${res.statusText}`)
    }

    const data: UsersResponse = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

export async function fetchUserById(id: number | string): Promise<User> {
  const url = `${BASE_URL}/users/${id}`

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`User with ID ${id} was not found.`)
      }
      throw new Error(`Failed to fetch user: HTTP ${res.status} ${res.statusText}`)
    }

    const data: User = await res.json()
    return data
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)
    throw error
  }
}

export async function fetchUserPosts(id: number | string): Promise<Post[]> {
  const url = `${BASE_URL}/users/${id}/posts`

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return []
    }

    const data: PostsResponse = await res.json()
    return data.posts || []
  } catch (error) {
    console.warn(`Error fetching posts for user ${id}:`, error)
    return []
  }
}

export async function fetchUserTodos(id: number | string): Promise<Todo[]> {
  const url = `${BASE_URL}/users/${id}/todos`

  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return []
    }

    const data: TodosResponse = await res.json()
    return data.todos || []
  } catch (error) {
    console.warn(`Error fetching todos for user ${id}:`, error)
    return []
  }
}

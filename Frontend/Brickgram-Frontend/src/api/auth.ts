const BASE_URL = "http://localhost:3000"

export const login = async (identifier: string, password: string) => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Login Failed")
    return data
}

export const register = async (username: string, email: string, fullName: string, password: string, terms: boolean) => {
    const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, email, name: fullName, password})
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Register Failed")
    return data
}

export const checkUsernameAvailablety = async (username: string) => {
    const res = await fetch("http://localhost:3000/api/users/username/" + username)
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || "Checking Failed")
    if (!data) {
        return true
    }
    else {
        return false
    }
}

export const updateUser = async (updateData: any) => {
    const res = await fetch("http://localhost:3000/api/users", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(updateData)
    })
    const data = await res.json()
  if (!res.ok) {
    throw new Error(data.error || "Failed to update user")
  }

  return data
}

export const getCurrentUser = async () => {
    const res = await fetch(BASE_URL + '/api/users/current', {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    return await res.json()
}
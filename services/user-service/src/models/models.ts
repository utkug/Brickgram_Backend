export interface User {
    id: number
    username: string
    name: string
    email: string
    password: string
    created_at: Date
    updated_at: Date
    profile_picture?: String
    bio?: string
    location?: string
    is_private: boolean
    is_verified: boolean
    status: Status
    role: Role
}

enum Status {
    ACTIVE,
    INACTIVE,
    SUSPENDED,
    DELETED
}
enum Role {
    USER,
    ADMIN
}

export interface CreateUserInput {
    username: string
    name: string
    email: string
    password: string
}

export interface UpdateUserInput {
    name?: string
    email?: string
    password?: string
    profile_picture?: string
    bio?: string
    location?: string
    is_private?: boolean
}

import { Request, Response } from "express"
import { createUser, getUserByEmail, getUserById, getUserByUsername, searchUsersByUsername, updateUser } from "../services/userService"
import { CreateUserInput } from "../models/models"

export const getUserByEmailHandler = async (req: Request, res: Response) => {
    try {
        const userEmail = req.params.email
        const user = await getUserByEmail(userEmail)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}

export const getUserByUsernameHandler = async (req: Request, res: Response) => {
    try {
        const currentUserId = req.headers["x-user-id"] as string
        const username = req.params.username
        const user = await getUserByUsername(username, currentUserId)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}

export const getUserByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await getUserById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}

export const searchUsersByUsernameHandler = async (req: Request, res: Response) => {
    try {
        const username = req.query.q as string
        const take = Number(req.query.take)
        const users = await searchUsersByUsername(username, take)
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "failed", error: error})
    }
}

export const createUserHandler = async (req: Request, res: Response) => {
    try {
        const user: CreateUserInput = req.body
        const createdUser = await createUser(user)

        const { password, ...userWithoutPassword } = createdUser
        res.status(201).json(userWithoutPassword)
    }
    catch (err) {
        res.status(500).json({message: "Could not create user", error: err})
    }
}

export const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const userId = req.headers["x-user-id"] as string
        console.log(userId)
        const updateData = req.body

        const updatedUser = await updateUser(userId, updateData)
        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({message: "not", error: error})
    }
}
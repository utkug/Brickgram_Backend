import { Request, Response } from "express"
import { createUser, getUserByEmail, getUserByUsername, updateUser } from "../services/userService"
import { CreateUserInput } from "../models/models"
import { successResponse } from "../middlewares/responseFormatter"
import { AuthenticatedRequest } from "../middlewares/authMiddleware"


// GET /users?username=utku || /users?email=utku@example.com
export const getUserHandler = async (req: Request, res: Response) => {
    try {
        const { username, email } = req.query
        let user
        if (username) user = await getUserByUsername(username as string)
        else if (email) user = await getUserByEmail(email as string)
        else return res.status(400).json({message: "username or email is required"})

        if (!user) return res.status(404).json({message: "User not found"})

        return successResponse(res, 200, user)
        //res.status(200).json(user)

    } catch (error) {
        res.status(500).json({error: error})
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

export const updateUserHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.user?.id!
        const updateData = req.body

        const updatedUser = await updateUser(userId, updateData)

        return successResponse(res, 200, updatedUser, "User updated successfully")

    } catch (error) {
        res.status(500).json({message: "not", error: error})
    }
}
import { Request, Response } from "express"
import { createUser, getUserByUsername } from "../services/userService"
import { CreateUserInput } from "../models/models"


export const getUserByUsernameHandler = async (req: Request, res: Response) => {
    const username = req.params['username']
    const user = await getUserByUsername(username)
    if(!user) return res.status(404).json({message: "User not found"})
    res.json(user)
}

export const createUserHandler = async (req: Request, res: Response) => {
    const user: CreateUserInput = req.body
    const createdUser = await createUser(user)
    res.status(201).json(user) 
}
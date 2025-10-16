import { Request, Response } from "express"
import { getAllThemes } from "../services/themesService" 

export const getThemes = async (req: Request, res: Response) => {
    const themes = await getAllThemes()
    res.json(themes)
}
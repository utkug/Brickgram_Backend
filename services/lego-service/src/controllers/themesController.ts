import { Request, Response } from "express"
import { getAllThemes } from "../service/themesService" 

export const getThemes = async (req: Request, res: Response) => {
    const themes = await getAllThemes()
    res.json(themes)
}
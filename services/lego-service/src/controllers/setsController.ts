import { Request, Response } from "express"
import { getAllSets } from "../service/setsService"

export const getSets = async (req: Request, res: Response) => {
    const { themeId, year } = req.query
    const result = await getAllSets(
        themeId ? Number(themeId) : undefined,
        year ? Number(year) : undefined
    )
    res.json(result)
}
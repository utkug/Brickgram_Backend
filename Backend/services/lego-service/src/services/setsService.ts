import { db } from "../db/db"

export const getAllSets = async (themeId?: number, year?: number) => {
    let query = db.selectFrom('sets').selectAll()

    if(themeId) query = query.where('theme_id', '=', themeId)
        
    if(year) query = query.where('year', '=', year)

    return await query.execute()
}

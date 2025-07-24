import { db } from "../db/db"

export const getAllThemes = async () => {
    let query = db.selectFrom("themes").selectAll()
    return await query.execute()
}
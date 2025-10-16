export interface LegoSet {
    set_num: string
    name: string
    year: number
    theme_id: number
    num_parts: number
    img_url: string
}

export interface LegoTheme {
    id: number
    name: string
    parent_id: number
}

export interface LegoDataBase {
    sets: LegoSet
    themes: LegoTheme
}
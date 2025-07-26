import { Response } from "express"


export const successResponse = (res: Response, code: number, data: any, message?: string) => {
    return res.status(code).json({
        status: "success",
        data,
        message
    })
}

export const errorResponse = (res: Response, code: number,  data: any, message?: string) => {
    return res.status(code).json({
        status: "error",
        code,
        data,
        message
    })
}
import dotenv from 'dotenv'
import axios from 'axios'
dotenv.config()

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || "http://localhost:3002" 

export const login = async () => {
    const response = await axios.get(`${USER_SERVICE_URL}/`)
}
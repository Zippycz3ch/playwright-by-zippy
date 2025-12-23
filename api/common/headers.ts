import { UserData } from "../models/UserData"

export const getRequestHeader = (userData: UserData) => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `token ${userData.access_token}`,
    }
}
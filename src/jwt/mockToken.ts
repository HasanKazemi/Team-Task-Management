import { User } from "../types";

export const generateToken = (userData: User): string => {
    const format = `${userData.id}.${userData.name}.${userData.password}.${userData.role}`
    const token = btoa(JSON.stringify(format))
    return token
};

export const decodeToken = (token: string): User => {
    const decoded = JSON.parse(atob(token))
    return decoded
}
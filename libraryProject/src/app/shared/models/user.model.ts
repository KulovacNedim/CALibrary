export interface UserDetails {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    role_id: number
    exp: number
    iat: number
}

export interface TokenResponse {
    token: string
}

export interface TokenPayload {
    id: number
    first_name: string
    last_name: string
    email: string
    password: string
    role_id: number
}
export interface Register {
    full_name: string,
    username: string,
    email: string,
    password: string
}

export interface Login {
    email: string,
    password: string
}
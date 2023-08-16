export interface User {
    id: number,
    username: string,
    full_name: string,
    email: string,
    avatar?: string,
    bio?: string,
    created_at: string,
    updated_at: string,
    threads?: Thread[],
    replies?: Reply[]
}

export interface Thread {
    id: number,
    content: string,
    image: string,
    is_liked: boolean,
    number_of_likes: number,
    created_at: string
    user: User,
    replies: Reply[]
}

export interface ThreadPost {
    content: string,
    image?: string,
}

export interface Reply {
    id: number,
    content: string,
    image: string,
    is_liked: boolean,
    number_of_likes: number,
    created_at: string,
    thread: Thread,
    user: User,
}
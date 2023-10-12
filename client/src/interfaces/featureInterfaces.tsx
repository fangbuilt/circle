export interface User {
    id: number,
    username: string,
    full_name: string,
    email: string,
    avatar?: string,
    bio?: string,
    banner?: string,
    threads?: Thread[],
    replies?: Reply[],
    created_at?: string,
    updated_at?: string
}

export interface Profile {
    avatar?: MediaSource | Blob | string,
    bio?: string,
    banner?: MediaSource | Blob | string
}

export interface Thread {
    id: number,
    content: string,
    image?: string ,
    user: User,
    likes?: Like[],
    is_liked: boolean,
    replies?: Reply[],
    created_at: string
}

export interface ThreadPost {
    content: string,
    image?: MediaSource | Blob | string
}

export interface Reply {
    id: number,
    content: string,
    image: string,
    is_liked: boolean,
    created_at: string,
    thread: Thread,
    user: User,
}

export interface ReplyPost {
    content: string,
    image?: MediaSource | Blob | string,
    thread_id?: number
}

export interface Like {
    id: number,
    thread: Thread,
    user: User
}
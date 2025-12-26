export class UserData {
    access_token: string;
    token_type: string;

    constructor(access_token: string, token_type: string) {
        this.access_token = access_token;
        this.token_type = token_type;
    }
}

export interface CreateUserRequest {
    username: string;
    password: string;
}

export interface CreateUserResponse {
    id: number;
    username: string;
}

export interface LoginRequest {
    username: string;
    password: string;
    csrf?: string;
}

export interface LoginResponse {
    token: string;
}
export class Auth {
    email?: string;
    password?: string;
    token?: string;
}

export class AuthResponse {
    status?: string;
    message?: string;
    data?: {
        accessToken?: string;
    };
}

class Usuario {
    id!: string;
    email?: string;
}

export class Users {
    "users": Usuario[]
    
}
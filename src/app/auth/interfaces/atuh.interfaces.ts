export interface User {
    'index': string;
    'email': string;
    'name': string;
    'education': levels;
    'password1': string;
    'password2':string;
}

enum levels {
    Preuniversitario = 'Preuniversitario',
    Pregrado = 'Pregrado',
    Posgrado = 'Posgrado'
}

export interface loginInterface {
    email:string;
    password1:string;
    currentUser?:User
}

export interface loginResponse {
    user: User,
    token: string
    currentUser?:User
}

export enum authStatus {
    Cheking = 'Cheking',
    Authenticated = 'Authenticated',
    NotAuthenticated = 'NotAuthenticated'
}

export interface checkTokenResponse {
    user: User,
    token: string,
    currentUser?:User
}
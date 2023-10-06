export interface iUserRequest {
    name: string;
    email: string;
    password: string;
}

export interface iEmailRequest {
    to: string;
    subject: string;
    text: string
}
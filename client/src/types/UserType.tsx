export type User = {
    id: string;
    name: string;
    role: UserRole;
};

export type UserRef = {
    id: string;
    name: string;
};

export enum UserRole {
    'Normal',
    'Moderator',
    'Administrator',
}

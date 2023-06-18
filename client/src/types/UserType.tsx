export type User = {
    id: string;
    name: string;
    role: UserRole;
};

export type UserRef = {
    id: string | null;
    name: string | undefined;
};

export enum UserRole {
    'Normal',
    'Moderator',
    'Administrator',
}

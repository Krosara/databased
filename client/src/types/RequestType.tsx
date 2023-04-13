export type Request = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    subject: string;
    category: RequestCategory;
    author: string;
    requestedBy: UserRef;
    requestedFor: UserRef;
    team: Team;
    comments: Comment[];
    assets: AssetRef[];
    completedAt: Date;
};

type AssetRef = {
    id: string;
    label: string;
    name: string;
};

type Comment = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    createdBy: UserRef;
};

type Team = {};

export type UserRef = {
    id: string;
    name: string;
};

export enum RequestCategory {
    Incident,
    RFC,
    RFI,
    Order,
    Complaint,
    Other,
}

export type Asset = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    label: string;
    name: string;
    status: AssetStatus;
    isSoftware: boolean;
};

export enum AssetStatus {
    InProduction = 1,
    BrokenDown = 2,
    BeingRepaired = 3,
    Archived = 4,
    ToBeRemoved = 5,
}

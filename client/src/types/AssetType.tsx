export type Asset = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    label: string;
    name: string;
    status: AssetStatus;
    isSoftware: boolean;
};

export type AssetRef = {
    id: string;
    label: string;
    name: string;
};

export enum AssetStatus {
    'In Production',
    'Broken Down',
    'Being Repaired',
    'Archived',
    'To Be Removed',
}

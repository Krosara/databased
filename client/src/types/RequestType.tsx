import { DataTableFilterMeta } from 'primereact/datatable';
import { AssetRef } from './AssetType';
import { UserRef } from './UserType';

export type Request = {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    subject: string;
    category: RequestCategory;
    author?: UserRef;
    requestedBy?: UserRef;
    requestedFor?: UserRef;
    team?: Team;
    comments?: Comment[];
    assets?: AssetRef[];
    completedAt?: Date;
    status: RequestStatus;
};

export type Comment = {
    id?: string;
    createdAt: Date;
    updatedAt: Date;
    content: string;
    createdBy: UserRef;
};

type Team = {};

export enum RequestCategory {
    'Incident',
    'RFC',
    'RFI',
    'Order',
    'Complaint',
    'Other',
}

export enum RequestStatus {
    'Declined',
    'On Backlog',
    'Assigned',
    'Accepted',
    'In Progress',
    'Completed',
}

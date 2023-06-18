import { AssetStatus } from '../types/AssetType';

const getStatus = (status: number) => {
    switch (status) {
        case AssetStatus['In Production']:
            return 'In Production';
        case AssetStatus['Broken Down']:
            return 'Broken Down';
        case AssetStatus['Being Repaired']:
            return 'Being Repaired';
        case AssetStatus['Archived']:
            return 'Archived';
        case AssetStatus['To Be Removed']:
            return 'To Be Removed';
        default:
            return 'Other';
    }
};

const getStatuses = () => {
    var statuses = [];
    for (const s in AssetStatus) {
        if (isNaN(Number(s))) {
            statuses.push(s);
        }
    }
    return statuses;
};

export { getStatus, getStatuses };

import { RequestStatus } from '../types/RequestType';

const getRequestStatus = (status: number) => {
    switch (status) {
        case RequestStatus['Declined']:
            return 'Declined';
        case RequestStatus['On Backlog']:
            return 'On Backlog';
        case RequestStatus['Assigned']:
            return 'Assigned';
        case RequestStatus['Accepted']:
            return 'Accepted';
        case RequestStatus['In Progress']:
            return 'In Progress';
        case RequestStatus['Completed']:
            return 'Completed';
    }
};

const getRequestStatuses = () => {
    var statuses = [];
    for (const s in RequestStatus) {
        if (isNaN(Number(s))) {
            statuses.push(s);
        }
        return statuses;
    }
};

export { getRequestStatus, getRequestStatuses };

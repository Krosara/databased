import { RequestCategory } from '../types/RequestType';

const getRequestCategory = (category: number) => {
    switch (category) {
        case RequestCategory['Incident']:
            return 'Incident';
        case RequestCategory['RFC']:
            return 'RFC';
        case RequestCategory['RFI']:
            return 'RFI';
        case RequestCategory['Order']:
            return 'Order';
        case RequestCategory['Complaint']:
            return 'Complaint';
        case RequestCategory['Other']:
            return 'Other';
    }
};

const getRequestCategories = () => {
    var statuses = [];
    for (const s in RequestCategory) {
        if (isNaN(Number(s))) {
            statuses.push(s);
        }
        return statuses;
    }
};

export { getRequestCategory, getRequestCategories };

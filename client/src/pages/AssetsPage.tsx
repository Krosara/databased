import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Asset, AssetStatus } from '../types/RequestType';
import axios from 'axios';

axios.defaults.baseURL = 'https://127.0.0.1:9000';

const AssetsPage = () => {
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(() => {
        axios.get('/gateway/assets').then((response) => {
            if (response.status === 200) {
                setAssets(response.data);
            }
        });
    }, []);

    const statusCell = (data: Asset) => {
        console.log(data);
        return <div>{getStatus(data.status)}</div>;
    };

    const getStatus = (status: number) => {
        switch (status) {
            case AssetStatus.InProduction:
                return 'In Production';
            case AssetStatus.BrokenDown:
                return 'Broken Down';
            case AssetStatus.BeingRepaired:
                return 'Being Repaired';
            case AssetStatus.Archived:
                return 'Archived';
            case AssetStatus.ToBeRemoved:
                return 'To Be Removed';
            default:
                return 'Other';
        }
    };

    return (
        <DataTable value={assets}>
            <Column field="id" header="ID" />
            <Column field="createdAt" header="CreatedAt" dataType="Date" />
            <Column field="label" header="Label" />
            <Column field="status" header="Status" body={statusCell} />
            <Column field="isSoftware" header="Is Software" />
        </DataTable>
    );
};

export default AssetsPage;

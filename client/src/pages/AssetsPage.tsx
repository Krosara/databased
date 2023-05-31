import { useEffect, useState } from 'react';
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { getStatus } from '../helpers/GetAssetStatusHelper';
import { AssetModal } from '../components/AssetModal/AssetModal';
import { Asset } from '../types/AssetType';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';

const AssetsPage = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Asset | undefined>();

    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    //modal
    const [visible, setVisible] = useState<boolean>(false);

    const getAssets = async (): Promise<any> => {
        try {
            setLoading(true);

            const accessToken = await getAccessTokenSilently();

            const response = await axios.get('/gateway/assets', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                const data = await response.data;
                setAssets(data);
            }

            setLoading(false);
        } catch (error: any) {
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
        }
    };

    useEffect(() => {
        getAssets();
    }, [visible]);

    const statusCell = (data: Asset) => {
        return <div>{getStatus(data.status)}</div>;
    };

    const handleModalClose = () => {
        setVisible(false);
        getAssets();
    };

    const onAssetSelect = () => {};

    return (
        <div className="flex">
            <div className="flex 1 w-2/3">
                <AssetModal visible={visible} onHide={handleModalClose} />
                <Button
                    label="Add asset"
                    onClick={() => setVisible(true)}
                    className="mb-2 "
                />

                {assets.length > 0 ? (
                    <DataTable
                        lazy
                        value={assets}
                        dataKey="id"
                        rowHover
                        scrollable
                        selectionMode="single"
                        selection={selected}
                        onSelectionChange={(e: any) => {
                            setSelected(e.value);
                        }}
                    >
                        <Column field="id" header="ID" />
                        <Column
                            field="createdAt"
                            header="CreatedAt"
                            dataType="Date"
                        />
                        <Column field="label" header="Label" />
                        <Column
                            field="status"
                            header="Status"
                            body={statusCell}
                        />
                        <Column field="isSoftware" header="Is Software" />
                    </DataTable>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="flex 1 w-1/3">
                {selected ? (
                    <h2>
                        {selected.label} - {selected.name}
                    </h2>
                ) : (
                    <div>Select one</div>
                )}
            </div>
        </div>
    );
};

export default AssetsPage;

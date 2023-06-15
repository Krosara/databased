import { useEffect, useState } from 'react';
import {
    DataTable,
    DataTableSelectionChangeEvent,
    DataTableSortMeta,
} from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { getStatus } from '../helpers/GetAssetStatusHelper';
import { AssetModal } from '../components/AssetModal/AssetModal';
import { Asset } from '../types/AssetType';
import { useAuth0 } from '@auth0/auth0-react';
import { Paginator } from 'primereact/paginator';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';

const AssetsPage = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Asset | undefined>();

    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(10);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null | undefined>(
        1
    );
    const [sortMeta, setSortMeta] = useState<
        DataTableSortMeta[] | null | undefined
    >([]);

    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    //modal
    const [visible, setVisible] = useState<boolean>(false);

    const totalPages = Math.ceil(assets.length / rows);

    const onPageChange = (e: { first: number; rows: number }) => {
        setFirst(e.first);
        setRows(e.rows);
    };

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

    // const onSort = (e: any) => {
    //     setSortField(e.multiSortMeta[0].field);
    //     console.log(e.multiSortMeta[0].field);
    //     console.log(sortField);
    //     setSortOrder(e.multiSortMeta[0].order);
    // };

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
                    <div>
                        <DataTable
                            value={assets.slice(first, first + rows)}
                            dataKey="id"
                            rowHover
                            stripedRows
                            scrollable
                            selectionMode="single"
                            selection={selected}
                            onSelectionChange={(e: any) => {
                                setSelected(e.value);
                            }}
                            onPage={(e) => setFirst(e.first)}
                            emptyMessage="No assets found."
                            sortOrder={sortOrder}
                            sortField={sortField}
                            onSort={(e) => {
                                setSortField(e.sortField);
                                setSortOrder(e.sortOrder);
                                // console.log(e);
                            }}
                            // sortMode="multiple"
                            multiSortMeta={sortMeta}
                            removableSort
                        >
                            <Column field="id" header="ID" sortable />
                            <Column field="label" header="Label" sortable />
                            <Column field="name" header="Name" sortable />
                            <Column
                                field="status"
                                header="Status"
                                body={statusCell}
                                // sortable
                            />
                            <Column
                                field="isSoftware"
                                header="Is Software"
                                sortable
                            />
                        </DataTable>
                        <Paginator
                            first={first}
                            rows={10}
                            totalRecords={assets.length}
                            onPageChange={onPageChange}
                            template={{
                                layout: 'PrevPageLink CurrentPageReport NextPageLink',
                            }}
                            className="p-paginator-custom"
                        />
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="flex 1 w-1/3">
                {selected ? (
                    <div>
                        <AssetDetails
                            label={selected.label}
                            name={selected.name}
                            isSoftware={selected.isSoftware}
                            status={selected.status}
                        />
                    </div>
                ) : (
                    <div>Select one</div>
                )}
            </div>
        </div>
    );
};

export default AssetsPage;

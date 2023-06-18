import { useEffect, useState } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column, ColumnFilterElementTemplateOptions } from 'primereact/column';
import axios from 'axios';
import { Button } from 'primereact/button';
import { getStatus, getStatuses } from '../helpers/GetAssetStatusHelper';
import { AssetModal } from '../components/AssetModal/AssetModal';
import { Asset, AssetStatus } from '../types/AssetType';
import { useAuth0 } from '@auth0/auth0-react';
import { Paginator } from 'primereact/paginator';
import { AssetDetails } from '../components/AssetDetails/AssetDetails';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import {
    isSoftwareBodyTemplate,
    statusItemTemplate,
} from '../components/Templates/AssetDataTableTemplates';

const AssetsPage = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Asset | undefined>();
    const [statuses] = useState<string[]>(getStatuses());

    // const [first, setFirst] = useState<number>(0);
    // const [rows, setRows] = useState<number>(10);
    const [sortField, setSortField] = useState<string>('label');
    const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null | undefined>(
        1
    );

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        label: {
            operator: FilterOperator.AND,
            constraints: [
                { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            ],
        },
        name: {
            operator: FilterOperator.AND,
            constraints: [
                { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            ],
        },
        status: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        isSoftware: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    //modal
    const [visible, setVisible] = useState<boolean>(false);

    // const onPageChange = (e: { first: number; rows: number }) => {
    //     setFirst(e.first);
    //     setRows(e.rows);
    // };

    const forceUpdate = useForceUpdate();

    const getAssets = async (): Promise<any> => {
        try {
            setLoading(true);

            const accessToken = await getAccessTokenSilently();

            console.log();
            const response = await axios.get('/gateway/assets', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                const data = await response.data;
                setAssets(data);
            } else {
                loginWithRedirect();
            }

            setLoading(false);
        } catch (error: any) {
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
            loginWithRedirect();
            setLoading(false);
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

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setFilters((prevFilters) => ({
            ...prevFilters,
            global: {
                ...prevFilters.global,
                value: value,
            },
        }));

        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div id="tableHeader" className="flex justify-content-between">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Clear"
                    outlined
                    onClick={clearFilter}
                />
                <Button
                    type="button"
                    icon="pi pi-refresh"
                    label="Refresh"
                    outlined
                    onClick={() => getAssets()}
                />
                <Button label="Add asset" onClick={() => setVisible(true)} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={globalFilterValue}
                        onChange={onGlobalFilterChange}
                        placeholder="Keyword Search"
                    />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            label: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ],
            },
            name: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ],
            },
            isSoftware: { value: null, matchMode: FilterMatchMode.EQUALS },
        });
        setGlobalFilterValue('');
    };

    const statusFilterTemplate = (
        options: ColumnFilterElementTemplateOptions
    ) => {
        return (
            <Dropdown
                value={AssetStatus[options.value]}
                options={Object.values(AssetStatus).filter((s) =>
                    isNaN(Number(s))
                )}
                onChange={(e: DropdownChangeEvent) => {
                    options.filterCallback(e.value, options.index);
                }}
                placeholder="Select One"
                className="p-column-filter"
                showClear
            />
        );
    };

    return (
        <div className="flex h-full">
            <div className="flex flex-none w-9" id="assetsTable">
                <AssetModal visible={visible} onHide={handleModalClose} />
                <div className="h-full w-full">
                    <DataTable
                        value={assets}
                        loading={loading}
                        dataKey="id"
                        rowHover
                        stripedRows
                        scrollable
                        scrollHeight="flex"
                        // style={document.getElementById('assetsTable').getBoundingClientRect().height}
                        selectionMode="single"
                        selection={selected}
                        onSelectionChange={(e: any) => {
                            setSelected(e.value);
                        }}
                        onRowSelect={(e: any) => {
                            setSelected(e.value);
                        }}
                        emptyMessage="No assets found."
                        sortOrder={sortOrder}
                        sortField={sortField}
                        onSort={(e) => {
                            setSortField(e.sortField);
                            setSortOrder(e.sortOrder);
                        }}
                        removableSort
                        header={header}
                        filters={filters}
                    >
                        <Column
                            header="#"
                            headerStyle={{ width: '1rem' }}
                            body={(data, options) => options.rowIndex + 1}
                        />
                        <Column
                            field="label"
                            header="Label"
                            sortable
                            filter
                            filterPlaceholder="Search by label"
                        />
                        <Column
                            field="name"
                            header="Name"
                            sortable
                            filter
                            filterPlaceholder="Search by name"
                        />
                        <Column
                            field="status"
                            header="Status"
                            body={statusCell}
                            filterElement={statusFilterTemplate}
                            filter
                        />
                        <Column
                            field="isSoftware"
                            header="Is Software"
                            body={isSoftwareBodyTemplate}
                            style={{ textAlign: 'center' }}
                            filter
                            filterPlaceholder="Is it software?"
                        />
                    </DataTable>
                </div>
            </div>
            <div className="flex flex-none w-3 pb-8 px-5 align-items-center justify-content-center mx-auto">
                {selected ? (
                    <div className="w-full">
                        <h2>Edit Asset</h2>

                        <AssetDetails
                            label={selected.label}
                            name={selected.name}
                            isSoftware={selected.isSoftware}
                            status={selected.status}
                            id={selected.id}
                            onSuccess={() => forceUpdate()}
                        />
                    </div>
                ) : (
                    <div>Select one</div>
                )}
            </div>
        </div>
    );
};

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue((value) => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here
    // is better than directly setting `setValue(value + 1)`
}

export default AssetsPage;

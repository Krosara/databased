import { useEffect, useState } from 'react';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Request, RequestCategory } from '../types/RequestType';
import axios from 'axios';
import { Button } from 'primereact/button';
import { RequestModal } from '../components/RequestModal/RequestModal';
import { useAuth0 } from '@auth0/auth0-react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Paginator } from 'primereact/paginator';
import { InputText } from 'primereact/inputtext';
import { RequestDetails } from '../components/RequestDetails/RequestDetails';

const RequestsPage = () => {
    const [requests, setRequests] = useState<Array<Request>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [selected, setSelected] = useState<Request | undefined>();

    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<0 | 1 | -1 | null | undefined>(
        1
    );

    const [filters, setFilters] = useState<DataTableFilterMeta>({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        subject: {
            operator: FilterOperator.AND,
            constraints: [
                { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            ],
        },
        category: {
            operator: FilterOperator.AND,
            constraints: [
                { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            ],
        },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState<string>('');

    const getRequests = async (): Promise<any> => {
        try {
            setLoading(true);

            const accessToken = await getAccessTokenSilently();

            const response = await axios.get('/gateway/requests', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.status === 200) {
                const data = await response.data;
                setRequests(data);
            }

            setLoading(false);
        } catch (error: any) {
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
            setLoading(false);
        }
    };

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        getRequests();
    }, [visible]);

    const categoryCell = (data: Request) => {
        return <div>{getCategory(data.category)}</div>;
    };

    const getCategory = (category: number) => {
        switch (category) {
            case RequestCategory.Incident:
                return 'Incident';
            case RequestCategory.RFC:
                return 'Request for change';
            case RequestCategory.RFI:
                return 'Request for info';
            case RequestCategory.Order:
                return 'Order';
            case RequestCategory.Complaint:
                return 'Complaint';
            default:
                return 'Other';
        }
    };

    const handleModalClose = () => {
        setVisible(false);
        getRequests();
    };

    const requestedByCell = (data: Request) => {
        return <div>{data.requestedBy?.name}</div>;
    };
    const requestedAtCell = (data: Request) => {
        var date = new Date(data.createdAt!);
        return <div>{date.toLocaleString()}</div>;
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
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            subject: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ],
            },
            category: {
                operator: FilterOperator.AND,
                constraints: [
                    { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ],
            },
            status: { value: null, matchMode: FilterMatchMode.EQUALS },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
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
                    onClick={() => getRequests()}
                />
                <Button label="Make request" onClick={() => setVisible(true)} />

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

    return (
        <div className="flex h-full">
            <div className="flex flex-none w-9" id="requestsTable">
                <RequestModal visible={visible} onHide={handleModalClose} />
                <div className="w-full">
                    <DataTable
                        value={requests}
                        loading={loading}
                        dataKey="id"
                        rowHover
                        stripedRows
                        scrollable
                        scrollHeight="flex"
                        selectionMode="single"
                        selection={selected}
                        onSelectionChange={(e: any) => {
                            setSelected(e.value);
                            console.log(typeof e.value.createdAt);
                        }}
                        emptyMessage="No requests found."
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
                            field="requestedBy"
                            header="Requested by"
                            body={requestedByCell}
                        />
                        <Column
                            field="requestedAt"
                            header="Requested At"
                            body={requestedAtCell}
                            dataType="date"
                            sortable
                        />
                        <Column field="subject" header="Subject" />
                        <Column
                            field="category"
                            header="Category"
                            body={categoryCell}
                        />
                    </DataTable>
                </div>
            </div>

            <div className="flex flex-none w-3 pb-8 px-5 align-items-center justify-content-center mx-auto">
                {selected ? (
                    <div className="w-full">
                        <RequestDetails
                            id={selected.id}
                            subject={selected.subject}
                            comments={selected.comments}
                            assets={selected.assets}
                            category={selected.category}
                            status={selected.status}
                            requestedBy={selected.requestedBy}
                            onSuccess={() => getRequests()}
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

export default RequestsPage;

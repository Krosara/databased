import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Request, RequestCategory } from '../types/RequestType';
import axios from 'axios';
import { Button } from 'primereact/button';
import { RequestModal } from '../components/RequestModal/RequestModal';
import { useAuth0 } from '@auth0/auth0-react';

const RequestsPage = () => {
    const [requests, setRequests] = useState<Array<Request>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

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
        } catch (error: any) {
            if (error.error === 'login_required') {
                loginWithRedirect({
                    authorizationParams: {
                        redirect_uri: window.location.origin,
                    },
                });
            }
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

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

    const requestedByCell = (data: Request) => {
        return <div>{data.requestedBy?.name}</div>;
    };
    const requestedForCell = (data: Request) => {
        return <div>{data.requestedFor?.name}</div>;
    };
    const authorCell = (data: Request) => {
        return <div>{data.author?.name}</div>;
    };

    return (
        <>
            <Button label="Make request" onClick={() => setVisible(true)} />
            <RequestModal visible={visible} onHide={() => setVisible(false)} />
            {requests.length > 0 ? (
                <DataTable
                    lazy
                    value={requests}
                    dataKey="id"
                    rowHover
                    scrollable
                >
                    <Column field="id" header="ID" />
                    <Column
                        field="createdAt"
                        header="CreatedAt"
                        dataType="Date"
                    />
                    <Column field="subject" header="Subject" />
                    <Column
                        field="category"
                        header="Category"
                        body={categoryCell}
                    />
                    <Column field="author" header="Author" body={authorCell} />
                    <Column
                        field="requestedBy"
                        header="Requested by"
                        body={requestedByCell}
                    />
                </DataTable>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default RequestsPage;

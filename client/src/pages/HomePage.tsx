import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Request, RequestCategory } from '../types/RequestType';
import axios from 'axios';

axios.defaults.baseURL = 'https://127.0.0.1:9000';

const HomePage = () => {
    // const [requests, setRequests] = useState<Request[]>([]);
    // const [loading, setLoading] = useState();

    // useEffect(() => {
    //     axios.get('/gateway/requests').then((response) => {
    //         if (response.status === 200) {
    //             setRequests(response.data);
    //         }
    //     });
    // }, []);

    // console.log(requests[40]);

    // const categoryCell = (data: Request) => {
    //     return <div>{getCategory(data.category)}</div>;
    // };

    // const getCategory = (category: number) => {
    //     switch (category) {
    //         case Category.Incident:
    //             return 'Incident';
    //         case Category.RFC:
    //             return 'Request for change';
    //         case Category.RFI:
    //             return 'Request for info';
    //         case Category.Order:
    //             return 'Order';
    //         case Category.Complaint:
    //             return 'Complaint';
    //         default:
    //             return 'Other';
    //     }
    // };

    // return (
    //     <DataTable value={requests}>
    //         <Column field="id" header="ID" />
    //         <Column field="createdAt" header="CreatedAt" dataType="Date" />
    //         <Column field="subject" header="Subject" />
    //         <Column field="category" header="Category" body={categoryCell} />
    //         <Column field="author.name" header="Author" />
    //         <Column field="requestedBy.name" header="Requested By" />
    //         <Column field="requestedFor.name" header="Requested For" />
    //     </DataTable>
    // );
    return <div>Home Page</div>;
};

export default HomePage;

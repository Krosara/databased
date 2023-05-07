import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Request, RequestCategory } from '../types/RequestType';
import axios from 'axios';

axios.defaults.baseURL = 'https://127.0.0.1:9001';

const HomePage = () => {
    return <div>Home Page</div>;
};

export default HomePage;

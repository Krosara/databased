import axios from 'axios';
import { useFormik, Form, Field, ErrorMessage, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import {
    Request,
    RequestCategory,
    RequestStatus,
} from '../../types/RequestType';
import { Checkbox } from 'primereact/checkbox';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import * as Yup from 'yup';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Asset } from '../../types/AssetType';

const Schema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    name: Yup.string().required('Name is required'),
});

const initialValues: Request = {
    subject: '',
    category: RequestCategory['RFC'],
    status: RequestStatus['On Backlog'],
    assets: [],
};

const RequestModal = (props: any) => {
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [assets, setAssets] = useState<Asset[]>([]);

    const createRequest = async (request: Request) => {
        try {
            const accessToken = await getAccessTokenSilently();

            const response = await axios.post('/gateway/requests', request, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (error: any) {
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
        }
    };

    const getAssets = async (): Promise<any> => {
        try {
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
        } catch (error: any) {
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
        }
    };

    const handleSubmit = (newRequest: Request, { resetForm }: any) => {
        try {
            console.log(newRequest);
            createRequest(newRequest);
            resetForm();
        } catch {
            console.log("Couldn't create request");
        }
    };

    return (
        <Dialog
            header="New request"
            visible={props.visible}
            onHide={props.onHide}
            style={{ width: '50vw' }}
            draggable={false}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={Schema}
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-900 font-medium mb-2"
                            >
                                Subject
                            </label>
                            <Field
                                as={InputText}
                                id="subject"
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                className="w-full mb-1"
                            />
                            <ErrorMessage
                                name="subject"
                                component="div"
                                className="p-error mb-2"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-900 font-medium mb-2"
                            >
                                Status
                            </label>
                            <Dropdown
                                id="status"
                                name="status"
                                value={RequestStatus[values.status]}
                                options={Object.values(RequestStatus).filter(
                                    (s) => isNaN(Number(s))
                                )}
                                placeholder="Status"
                                onChange={(e) => {
                                    setFieldValue(
                                        'status',
                                        RequestStatus[e.value]
                                    );
                                }}
                                className="mb-3"
                            />
                        </div>
                        <div>
                            <MultiSelect
                                value={assets}
                                display="chip"
                                optionLabel="label"
                                onChange={(e) =>
                                    setFieldValue('assets', e.value)
                                }
                            />
                        </div>

                        <Button
                            type="submit"
                            label="Ok"
                            icon="pi pi-user"
                            className="w-full"
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export { RequestModal };

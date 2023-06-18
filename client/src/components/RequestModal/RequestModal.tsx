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
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import * as Yup from 'yup';
import { User, useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Asset, AssetRef } from '../../types/AssetType';
import { UserRef } from '../../types/UserType';

const Schema = Yup.object().shape({
    subject: Yup.string().required('Subject is required'),
});

const RequestModal = (props: any) => {
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [selectedAssets, setSelectedAssets] = useState<AssetRef[] | null>(
        null
    );
    const { user } = useAuth0();

    const initialValues: Request = {
        subject: '',
        status: RequestStatus['On Backlog'],
        category: RequestCategory['Incident'],
        assets: [],
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

    const handleSubmit = async (newRequest: Request, { resetForm }: any) => {
        try {
            setLoading(true);

            const accessToken = await getAccessTokenSilently();

            const _user: UserRef = {
                id: null,
                name: user?.nickname,
            };

            newRequest.author = _user;
            newRequest.requestedBy = _user;

            const assetRefs: AssetRef[] | undefined = selectedAssets?.map(
                (a) => ({
                    id: a.id,
                    label: a.label,
                    name: a.name,
                })
            );

            newRequest.assets = assetRefs;

            const response = await axios.post('/gateway/requests', newRequest, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.status === 201) {
                resetForm();
                setSelectedAssets(null);
                setLoading(false);
                setVisible(false);
            }
        } catch (error: any) {
            console.log("Couldn't create request");
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        getAssets();
    }, []);

    return (
        <Dialog
            header="New request"
            visible={props.visible && visible}
            onHide={props.onHide}
            style={{ width: '50vw' }}
            draggable={false}
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            closeOnEscape={true}
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
                                className="w-full mb-3"
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
                                className="mb-3 w-5"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-900 font-medium mb-2"
                            >
                                Category
                            </label>
                            <Dropdown
                                id="category"
                                name="category"
                                value={RequestCategory[values.category]}
                                options={Object.values(RequestCategory).filter(
                                    (s) => isNaN(Number(s))
                                )}
                                placeholder="Category"
                                onChange={(e) => {
                                    setFieldValue(
                                        'category',
                                        RequestCategory[e.value]
                                    );
                                }}
                                className="mb-5 w-5"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="assets"
                                className="block text-900 font-medium mb-2"
                            >
                                Assets
                            </label>
                            <MultiSelect
                                id="assets"
                                name="assets"
                                value={selectedAssets}
                                options={assets}
                                display="chip"
                                optionLabel="label"
                                onChange={(e: MultiSelectChangeEvent) =>
                                    setSelectedAssets(e.value)
                                }
                                className="mb-3 w-full"
                                filter
                                placeholder="Select related assets"
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

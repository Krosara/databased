import axios from 'axios';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import * as Yup from 'yup';
import { Asset, AssetStatus } from '../../types/AssetType';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Schema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    name: Yup.string().required('Name is required'),
});

const AssetDetails = (props: any) => {
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    const updateAsset = async (asset: Asset) => {
        try {
            setLoading(true);
            const accessToken = await getAccessTokenSilently();

            const response = await axios.put(
                `/gateway/assets/${asset.id}`,
                asset,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (response.status === 204) {
                setLoading(false);
                props.onSuccess;

                console.log('successfully updated asset');
            }
        } catch (error: any) {
            console.log("Couldn't create asset");
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
            setLoading(false);
        }
    };

    const initialValues: Asset = {
        id: props.id,
        label: props.label,
        name: props.name,
        isSoftware: props.isSoftware,
        status: props.status,
    };

    const handleSubmit = (newAsset: Asset, { resetForm }: any) => {
        try {
            console.log(newAsset);
            updateAsset(newAsset);
            resetForm();
            () => props.onSuccess;
        } catch {
            console.log("Couldn't create asset");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={Schema}
            enableReinitialize
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                    <div>
                        <label
                            htmlFor="label"
                            className="block text-900 font-medium mb-2 text-white"
                        >
                            Label
                        </label>
                        <Field
                            as={InputText}
                            id="label"
                            type="text"
                            name="label"
                            placeholder="Label"
                            className="w-full mb-1"
                        />
                        <ErrorMessage
                            name="label"
                            component="div"
                            className="p-error mb-2"
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="name"
                            className="block text-900 font-medium mb-1 mt-3 text-white"
                        >
                            Name
                        </label>
                        <Field
                            as={InputText}
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="w-full mb-1"
                        />
                        <ErrorMessage
                            name="name"
                            component="div"
                            className="p-error mb-2"
                        />
                    </div>

                    <div className="flex align-items-center mb-3">
                        <Checkbox
                            id="isSoftware"
                            inputId="isSoftware"
                            name="isSoftware"
                            onChange={(e) => {
                                setFieldValue('isSoftware', !values.isSoftware);
                            }}
                            checked={values.isSoftware}
                        />
                        <label htmlFor="isSoftware" className="ml-2">
                            Is software?
                        </label>
                    </div>
                    <div>
                        <label
                            htmlFor="status"
                            className="block text-900 font-medium mb-2 text-white"
                        >
                            Status
                        </label>
                        <Dropdown
                            id="status"
                            name="status"
                            value={AssetStatus[values.status]}
                            options={Object.values(AssetStatus).filter((s) =>
                                isNaN(Number(s))
                            )}
                            placeholder="Status"
                            onChange={(e) => {
                                setFieldValue('status', AssetStatus[e.value]);
                            }}
                            className="mb-3 w-full"
                        />
                    </div>

                    <Button
                        type="submit"
                        label="Update"
                        className="w-full"
                        disabled={isSubmitting}
                        loading={loading}
                    />
                </Form>
            )}
        </Formik>
    );
};

export { AssetDetails };

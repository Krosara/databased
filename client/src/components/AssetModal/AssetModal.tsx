import axios from 'axios';
import { Form, Field, ErrorMessage, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import * as Yup from 'yup';
import { Asset, AssetStatus } from '../../types/AssetType';
import { useState } from 'react';

const Schema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    name: Yup.string().required('Name is required'),
});

const initialValues: Asset = {
    label: '',
    name: '',
    isSoftware: false,
    status: AssetStatus['In Production'],
};

const AssetModal = (props: any) => {
    const [visible, setVisible] = useState(props.visible);

    const createAsset = (asset: Asset) => {
        var response = axios.post('/gateway/assets', asset);
        console.log(response);
    };

    const handleSubmit = (newAsset: Asset, { resetForm }: any) => {
        try {
            console.log(newAsset);
            createAsset(newAsset);
            resetForm();
        } catch {
            console.log("Couldn't create asset");
        }
    };

    return (
        <Dialog
            header="New asset"
            visible={props.visible}
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
                                htmlFor="label"
                                className="block text-900 font-medium mb-2"
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
                                className="block text-900 font-medium mb-1 mt-3"
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
                                inputId="isSoftware"
                                name="isSoftware"
                                onChange={(e) => {
                                    setFieldValue(
                                        'isSoftware',
                                        !values.isSoftware
                                    );
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
                                className="block text-900 font-medium mb-2"
                            >
                                Status
                            </label>
                            <Dropdown
                                id="status"
                                name="status"
                                value={AssetStatus[values.status]}
                                options={Object.values(AssetStatus).filter(
                                    (s) => isNaN(Number(s))
                                )}
                                placeholder="Status"
                                onChange={(e) => {
                                    setFieldValue(
                                        'status',
                                        AssetStatus[e.value]
                                    );
                                }}
                                className="mb-3"
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

export { AssetModal };

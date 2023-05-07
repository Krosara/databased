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
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    name: Yup.string().required('Name is required'),
});

const initialValues: Request = {
    subject: '',
    category: RequestCategory['RFC'],
    status: RequestStatus['On Backlog'],
};

const RequestModal = (props: any) => {
    const createRequest = (request: Request) => {
        var response = axios.post('/gateway/requests', request);
        console.log(response);
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

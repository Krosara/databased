import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Comment, Request, RequestCategory } from '../../types/RequestType';
import { AssetRef } from '../../types/AssetType';
import { InputTextarea } from 'primereact/inputtextarea';
import { Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { UserRef } from '../../types/UserType';

const Schema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    name: Yup.string().required('Name is required'),
});

const RequestDetails = (props: any) => {
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
    const [newComment, setNewComment] = useState<string>('');
    const { user } = useAuth0();

    const initialValues: Request = {
        id: props.id,
        subject: props.subject,
        category: props.category,
        status: props.status,
        requestedBy: props.requestedBy,
        assets: props.assets,
        comments: props.comments,
    };

    const addComment = async (request: Request) => {
        try {
            setLoading(true);
            const accessToken = await getAccessTokenSilently();

            const _user: UserRef = {
                id: null,
                name: user?.nickname,
            };

            const _comment: Comment = {
                content: newComment,
                createdBy: _user,
            };

            var comments: Comment[] | undefined = [];

            comments = request.comments;

            comments?.push(_comment);

            request.comments = comments;

            // request.comments?.push(_comment);
            console.log(request);

            const response = await axios.put(
                `/gateway/requests/${request.id}`,
                request,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            console.log(response);

            if (response.status === 204) {
                setLoading(false);
                props.onSuccess;

                console.log('Successfully added comment');
            }
        } catch (error: any) {
            console.log("Couldn't create asset");
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
            setLoading(false);
        }
    };

    const handleSubmit = (newRequest: Request, { resetForm }: any) => {
        console.log(newRequest);
        try {
            console.log(newRequest);
            addComment(newRequest);
            setNewComment('');
        } catch {
            console.log("Couldn't create comment");
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            // validationSchema={Schema}
            enableReinitialize
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                    <div className="flex flex-column justify-content-start align-items-center">
                        <h2>{props.subject}</h2>
                        <div>
                            {props.assets.length > 0 ? (
                                <div>
                                    <b>Assets:</b>
                                    {props.assets.map((a: AssetRef) => (
                                        <div key={a.id}>
                                            {a.label} - {a.name}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <div></div>

                            {props.comments.length > 0 ? (
                                <div>
                                    <b>Comments</b>
                                    {props.comments.map((c: Comment) => (
                                        <div key={c.id}>
                                            <b>{c.createdBy.name}</b>
                                            <br />
                                            {c.content}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        <div>
                            <InputTextarea
                                value={newComment}
                                rows={5}
                                cols={30}
                                id="comment"
                                name="comment"
                                onChange={(e) => {
                                    setNewComment(e.target.value);
                                    console.log(newComment);
                                }}
                            />
                            <Button
                                type="submit"
                                label="Add Comment"
                                className="w-full"
                                // disabled={isSubmitting}
                                loading={loading}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export { RequestDetails };

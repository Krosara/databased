import axios from 'axios';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Comment, Request, RequestCategory } from '../../types/RequestType';
import { AssetRef } from '../../types/AssetType';

const Schema = Yup.object().shape({
    label: Yup.string().required('Label is required'),
    name: Yup.string().required('Name is required'),
});

const RequestDetails = (props: any) => {
    const [loading, setLoading] = useState(false);
    const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

    const addComment = async (comment: Comment, id: string) => {
        try {
            setLoading(true);
            // const accessToken = await getAccessTokenSilently();

            // const response = await axios.put(
            //     `/gateway/requests/${request.id}`,
            //     request,
            //     {
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`,
            //         },
            //     }
            // );

            // if (response.status === 204) {
            //     setLoading(false);
            //     props.onSuccess;

            //     console.log('successfully updated asset');
            // }
        } catch (error: any) {
            console.log("Couldn't create asset");
            if (error.error === 'login_required') {
                loginWithRedirect();
            }
            setLoading(false);
        }
    };

    const handleSubmit = (newComment: Comment, { resetForm }: any) => {
        try {
            // console.log(newRequest);
            // addComment(newComment);
            // resetForm();
            // () => props.onSuccess;
        } catch {
            console.log("Couldn't create asset");
        }
    };

    return (
        <div className="flex flex-column justify-content-start align-items-center">
            <h2>{props.subject}</h2>

            <div>
                {props.assets.map((a: AssetRef) => (
                    <div key={a.id}>
                        {a.label} - {a.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export { RequestDetails };

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth0 } from '@auth0/auth0-react';

const LoginPage = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <>
            <div className="flex align-items-center justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
                    <div className="text-center mb-5">
                        <div className="text-900 text-3xl font-medium mb-3">
                            Welcome to Databased
                        </div>
                    </div>
                    <div>
                        <Button
                            label="Sign In"
                            className="w-full"
                            onClick={() =>
                                loginWithRedirect({
                                    authorizationParams: {
                                        audience: import.meta.env
                                            .VITE_AUTH0_DOMAIN,
                                    },
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default LoginPage;

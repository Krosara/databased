import { useAuth0 } from '@auth0/auth0-react';
import React, { Component, ReactElement } from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';

// const AuthenticatedRoute = ({ children: any, ...rest }) => {
//     // const;
//     const { getAccessTokenSilently } = useAuth0();

//     return (
//         // <Route {...rest}>
//         //     {getAccessTokenSilently != null ? (
//         //         children
//         //     ) : (
//         //         <Navigate to="/login" />
//         //     )}
//         // </Route>
//     );
// };

// export default AuthenticatedRoute;

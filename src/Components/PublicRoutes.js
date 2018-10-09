import React from 'react';
import { Route, Redirect } from 'react-router-dom'




const PublicRoutes = ({
    component: Cmp,
    user,
    ...rest
}) => {
    return (<Route {...rest} component={(props) => {

        return (
            rest.restricted ?
                (
                    user ?
                        <Redirect to="/dashboard" /> :
                        <Cmp user={user} {...props} />
                )
                :

                <Cmp {...props} user={user}/>

        )
    }} />




    )
}

export default PublicRoutes;
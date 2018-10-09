import React from 'react';
import {Route ,Redirect} from 'react-router-dom'




const PrivateRoutes = ({
    component: Cmp,
    user,
    ...rest
})  => {
  return( <Route {...rest} component={ ( props) =>{
          console.log(user)
           return (
            user?

            <Cmp user={user} {...props} />  :

           <Redirect to="/sign_in"/>

           )
      }} />
      
         
      
 
  )
}

export default PrivateRoutes;

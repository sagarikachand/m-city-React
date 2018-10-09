import React from 'react';
import Layout from './Hoc/Layout';
import Home from '../src/Components/Home/Home'
import {Route , Switch ,Redirect}  from 'react-router-dom'
import SignIn from '../src/Components/Auth/Signin'
import Dashboard from './Components/Admin/Dashboard';
import PrivateRoutes from './Components/PrivateRoutes'
import PublicRoutes from './Components/PublicRoutes'
import AdminMatches from './Components/Admin/AdminMatches/AdminMatches'
import AddEditMatch from './Components/Admin/AdminMatches/AddEditMatch';



const Routes = ( props )  => {

  return(
    <Layout>
       <Switch>
         <PrivateRoutes {...props} component={Dashboard} path="/dashboard" exact/>
         <PrivateRoutes {...props} component={AddEditMatch} path="/admin_matches/edit_match/:id" exact/>
         <PrivateRoutes {...props} component={AddEditMatch} path="/admin_matches/edit_match" exact/>
         <PrivateRoutes {...props} component={AdminMatches} path="/admin_matches" exact/>
      
         <PublicRoutes {...props} restricted={true} component={SignIn} path="/sign_in" exact/>
         <PublicRoutes {...props} restricted={false} path="/" exact component= {Home}/>

         {/* <Route path="/dashboard" exact component={Dashboard} /> 
         <Route path="/sign_in" exact component= {SignIn}  />
         <Route path="/" exact component= {Home}  /> */}
        
        </Switch>
    </Layout>
  )
}

export default Routes;

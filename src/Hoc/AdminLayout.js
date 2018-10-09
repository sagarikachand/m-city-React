import React from 'react';
import AdminNav from '../Components/Admin/AdminNav'


const AdminLayout = (props) => {
    return (
        <div className="admin_container">
            <div className="admin_left">
            <AdminNav />
            </div>

            <div className="admin_right">
               {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;
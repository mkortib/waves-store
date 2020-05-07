import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './manage-brands';
import ManageWoods from './manage-woods';

const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands />
            <ManageWoods />
        </UserLayout>
    );
};

export default ManageCategories;

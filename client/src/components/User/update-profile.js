import React from 'react';
import UserLayout from '../../hoc/user';
import UpdatePersonalNfo from '../utils/User/update-personal-nfo';

const UpdateProfile = () => {
    return (
        <UserLayout>
            <h1>Profile</h1>
            <UpdatePersonalNfo />
        </UserLayout>
    );
};

export default UpdateProfile;

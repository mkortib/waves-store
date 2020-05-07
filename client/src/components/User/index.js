import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import MyButton from '../utils/button';
import HistoryBlock from '../utils/User/history';

const UserDashboard = ({ user }) => {
    return (
        <UserLayout>
            <div className="">
                <div className="user-nfo-panel">
                    <h1 className="user-nfo-panel__title">User information</h1>
                    <div className="user-list">
                        <div className="user-list__item">
                            <span>Name:</span>
                            <span>{user.userData.name}</span>
                        </div>
                        <div className="user-list__item">
                            <span>Last Name:</span>
                            <span>{user.userData.lastname}</span>
                        </div>
                        <div className="user-list__item">
                            <span>Email:</span>
                            <span>{user.userData.email}</span>
                        </div>
                    </div>
                    <MyButton
                        type="default"
                        title="Edit account info"
                        linkTo="/user/user_profile"
                    />
                </div>
                {user.userData.history ? (
                    <div className="user-nfo-panel">
                        <h1 className="user-nfo-panel__title">
                            History purchases
                        </h1>
                        <div className="user-product-block user-product-block--history">
                            <HistoryBlock products={user.userData.history} />
                        </div>
                    </div>
                ) : null}
            </div>
        </UserLayout>
    );
};

export default UserDashboard;

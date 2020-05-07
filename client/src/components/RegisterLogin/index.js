import React from 'react';
import MyButton from '../utils/button';
import Login from '../RegisterLogin/login';
import './register-login.scss';

const RegisterLogin = () => {
    return (
        <div className="cm-container">
            <div className="register-login-container">
                <div className="register-login-container__left">
                    <h1 className="title-1">New Customer</h1>
                    <p className="description-1">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laudantium dicta veniam dolore debitis quibusdam, illo
                        ducimus totam corrupti sapiente beatae. Tempora iure
                        necessitatibus odio cum incidunt recusandae ducimus
                        sequi ullam laborum, officiis iste doloremque adipisci
                        vitae consequuntur, enim facilis excepturi eveniet.
                        Quidem rerum iusto placeat beatae possimus sed
                        reprehenderit exercitationem.
                    </p>
                    <MyButton
                        type="default"
                        title="Create an account"
                        linkTo="/register"
                        addStyles={{
                            margin: '10px 0 0 0',
                        }}
                    />
                </div>

                <div className="register-login-container__right">
                    <h2 className="title-2">Registered customers</h2>
                    <p className="description-2">
                        If you have an account please log in.
                    </p>
                    <Login />
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;

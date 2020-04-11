import React from 'react';
import MyButton from '../utils/button';

import Login from '../Register_login/login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Customer</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Laudantium dicta veniam dolore debitis
                            quibusdam, illo ducimus totam corrupti sapiente
                            beatae. Tempora iure necessitatibus odio cum
                            incidunt recusandae ducimus sequi ullam laborum,
                            officiis iste doloremque adipisci vitae
                            consequuntur, enim facilis excepturi eveniet. Quidem
                            rerum iusto placeat beatae possimus sed
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

                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account please log in.</p>
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;

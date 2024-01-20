import React from 'react';
import Formulario from '../components/FormularioDeLogin';

const Login = () => {
    return (
        <div className='container d-flex justify-content-center mt-5  p-5' style={{backgroundColor:"red" , borderRadius:'25px'}}>
            <Formulario/>
        </div>
    );
}

export default Login;

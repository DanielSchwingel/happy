import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Branding from '../components/Branding';

function ForgotPassword(){
    return(
        <Branding>
            <Link to='/' className="back-landing">
                <FiArrowLeft size={26} color="#15C3D6" />
            </Link>
            <form>
                <h1>Esqueci a senha</h1>
                <p>Sua redefinição de senha será enviada para o e-mail cadastrado</p>
                <div className='field-column'> 
                <label>E-mail</label>
                    <input type='email' />
                </div>
                <button type='submit' className='button-submit'>Enviar</button>
            </form>
        </Branding>
    )
}

export default ForgotPassword;
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Branding from '../components/Branding';

function ResetPassword(){
    return(
        <Branding>
            <Link to='/' className="back-landing">
                <FiArrowLeft size={26} color="#15C3D6" />
            </Link>
            <form>
               <h1>Redefinição de senha</h1>
               <p>
                  Escolha uma nova senha para você
                  acessar o dashboard do Happy
               </p>
               <div className='field-column'> 
                  <label>Nova senha</label>
                  <input type='password' />
               </div>
               <div className='field-column'>
                  <label>Repetir a senha</label>
                  <input type='password' />
               </div>
               <button type='submit' className='button-submit'>Enviar</button>
            </form>
        </Branding>
    )
}

export default ResetPassword;
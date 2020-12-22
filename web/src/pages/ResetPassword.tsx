import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

// import { iResetPassword } from '../interfaces/user';
import Branding from '../components/Branding';
import api from '../services/api';
import history from '../utils/history';

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function ResetPassword(){
   const queryParams = useQuery();
   const [ password, setPassword ] = useState('');
   const [ confirmPassword, setConfirmPassword ] = useState('');

   async function handleSubmit(event: FormEvent){
       event.preventDefault();
       if (confirmPassword !== password) {
           alert('Senhas não conferem, verifique!');
           return;
       }
		await api.post('reset-password', { 
			password,
			confirmPassword,
            tokenResetPassword: queryParams.get('token'),
        })
        .then(()=> {
            history.push('/login');
        })
        .catch((error) => alert(`Token expirado ou inválido: ${error.message}`));	
   }


    return(
        <Branding>
            <Link to='/login' className="back-landing">
                <FiArrowLeft size={26} color="#15C3D6" />
            </Link>
            <form onSubmit={handleSubmit}>
               <h1>Redefinição de senha</h1>
               <p>
                  Escolha uma nova senha para você
                  acessar o dashboard do Happy
               </p>
               <div className='field-column'> 
                  <label>Nova senha</label>
                  <input
                    type='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
               </div>
               <div className='field-column'>
                  <label>Repetir a senha</label>
                  <input
                    type='password' 
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                />
               </div>
               <button type='submit' className='button-submit'>Enviar</button>
            </form>
        </Branding>
    )
}

export default ResetPassword;
import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Branding from '../components/Branding';
import history from '../utils/history';
import api from '../services/api';

function ForgotPassword(){
    const [ email, setEmail ] = useState('');

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        await api.post('forgot-password', { email } )
            .then((response)=>{
                if (response.data.success === true) {
                    alert('Senha alterada, verifique ')
                    history.push('/login');    
                } 
                alert(response.data.error);         
            })
            .catch((error) => {
                alert(error)
            }
        );         
    }  

    return(
        <Branding>
            <Link to='/' className="back-landing">
                <FiArrowLeft size={26} color="#15C3D6" />
            </Link>
            <form onSubmit={handleSubmit}>
                <h1>Esqueci a senha</h1>
                <p>Sua redefinição de senha será enviada para o e-mail cadastrado</p>
                <div className='field-column'> 
                <label>E-mail</label>
                    <input 
                        type='email' 
                        onChange={event => setEmail(event.target.value)}
                        value={email}
                    />
                </div>
                <button type='submit' className='button-submit'>Enviar</button>
            </form>
        </Branding>
    )
}

export default ForgotPassword;
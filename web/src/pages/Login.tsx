import React, { useState, FormEvent } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Branding from '../components/Branding';
import api from '../services/api';

function Login(){
    const [ email, setEmail ] =  useState('');
    const [ password, setPassword ] = useState('');

    async function handleLogin(event: FormEvent) {
        event.preventDefault();
        console.log(password)
        const response = await api.post('/authenticate', { email, password});
        console.log(response.data);
    }

    return(
        <Branding>
            <Link to='/' className="back-landing">
                <FiArrowLeft size={26} color="#15C3D6" />
            </Link>
            <form>
                <h1>Fazer login</h1>
                <div className='field-column'> 
                <label htmlFor="email">E-mail</label>
                    <input 
                        id='email' 
                        type='email' 
                        value={email}
                        onChange={event=> (setEmail(event.target.value))}
                    />
                </div>
                <div className="field-column">
                    <label htmlFor="password">Senha</label>
                    <input 
                        id="password"
                        type='password'
                        value={password}
                        onChange={event=> (setPassword(event.target.value))}
                    />
    P          </div>
                <div className="field-row">
                    <div style={{display:'flex', alignItems:'center'}}>
                        <input type="checkbox" /> <span>Lembrar-me</span>
                    </div>
                    <Link to='/forgot-password' className="forgot-password">
                        Esqueci minha senha
                    </Link>
                </div>
                <button type='submit' className='button-submit' onClick={handleLogin}>Entrar</button>
            </form>
        </Branding>
    )
}

export default Login;
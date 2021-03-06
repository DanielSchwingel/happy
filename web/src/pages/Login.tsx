import React, { useState, FormEvent, useContext } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Branding from '../components/Branding';
import { AuthContext } from '../contexts/AuthContext';
import { iUserLogin } from '../interfaces/user';

function Login(){
    const { signIn } = useContext(AuthContext)
    const [ email, setEmail ] =  useState('');
    const [ password, setPassword ] = useState('');
    const [ remember, setRemember ] = useState(true); 

    function handleLogin(event: FormEvent) {
        event.preventDefault();
        const user = {
            email,
            password,
            remember,
        } as iUserLogin;
        signIn(user).catch(() => alert('Dados inválidos'));
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
                </div>
                <div className="field-row">
                    <div>
                        <input 
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={()=> setRemember(!remember)}
                        />
                        <label htmlFor="remember">Lembrar-me</label>
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
import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Branding from '../components/Branding';

function Login(){
    return(
        <Branding>
            <Link to='/' className="back-landing">
                <FiArrowLeft size={26} color="#15C3D6" />
            </Link>
            <form>
                <h1>Fazer login</h1>
                <div className='field-column'> 
                <label>E-mail</label>
                    <input type='email' />
                </div>
                <div className="field-column">
                    <label>Senha</label>
                    <input type='password'/>
                </div>
                <div className="field-row">
                    <div style={{display:'flex', alignItems:'center'}}>
                        <input type="checkbox" /> <span>Lembrar-me</span>
                    </div>
                    <Link to='/forgot-password' className="forgot-password">
                        Esqueci minha senha
                    </Link>
                </div>
                <button type='submit' className='button-submit'>Entrar</button>
            </form>
        </Branding>
    )
}

export default Login;
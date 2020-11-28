import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/global.css';
import '../styles/pages/login.css';

import logoImg from '../images/logo-login.svg';

function Login(){
    return(
        <div id="page-login">
            <div className="content-left">
                <img src={logoImg}/>
                <div className="location">
                    <strong>Concórdia</strong>
                    <span>Santa Catarina</span>
                </div>
            </div>
            <div className="content-right">
                <Link to='/' className="backing-landing">
                    <FiArrowLeft size={26} color="#15C3D6" />
                </Link>
                <form>
                    <h1>Fazer login</h1>
                    <div className='field-text'> 
                        <label>E-mail</label>
                        <input type='email' />
                    </div>
                    <div className="field-text">
                        <label>Senha</label>
                        <input type='password'/>
                    </div>
                    <div className="field-check">
                        <div>
                            <input type="checkbox" /> <span>Lembrar-me</span>
                        </div>
                        <Link to='/' className="forgot-password">
                            Esqueci minha senha
                        </Link>
                    </div>
                    <button type='submit' className='button-submit'>Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
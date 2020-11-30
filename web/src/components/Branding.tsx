import React from 'react';

import '../styles/global.css';
import '../styles/components/branding.css';

import logoImg from '../images/logo-login.svg';


export default function Branding() {
	return (
		<div className='app-branding'>
			<img src={logoImg}/>
			<div className="location">
				<strong>Concórdia</strong>
				<span>Santa Catarina</span>
			</div>
		</div>
	)
};


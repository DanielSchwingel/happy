import React from 'react';

import confirmOrphanageImg from '../images/confirm.svg';
import history from '../utils/history';

import '../styles/pages/confirm-orphanage.css';

const ConfirmOrphanage:React.FC = () => {

   function handleNavigateToMaps(){
      history.push('/app');
   }
   return(
      <div id="page-confirm-orphanage">
         <header>
            <h1>Ebaaa!</h1>
            <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>
            <button onClick={handleNavigateToMaps}>
               Voltar para o mapa
            </button>
         </header>
         <main>
            <img src={confirmOrphanageImg} alt="Orfanato criado"/>
         </main>
      </div>
   )
};

export default ConfirmOrphanage;
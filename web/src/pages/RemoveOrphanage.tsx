import React, { useState, useEffect } from 'react';
import { Link ,useParams } from 'react-router-dom'

import removeOrphanageImg from '../images/remove.svg';

import api from '../services/api';
import history from '../utils/history';

import '../styles/pages/remove-orphanage.css';

interface iOrphanageParams {
   id: string;
}

interface iOrphanage {
	name: string;
	latitude: number;
	longitude: number;
	about: string;
	instructions: string;
	opening_hours: string;
	open_on_weekends: string;
	images: Array<{
		id: number;
		url: string;
	}>
}

const RemoveOrphanage: React.FC = ()=>{
   const [ orphanage, setOrphanage ] = useState<iOrphanage>();
   const params = useParams<iOrphanageParams>()

	useEffect(()=> {
		api.get(`orphanages/${params.id}`).then(response => {
			setOrphanage(response.data);
		})
   }, [params.id])
   
   function handleRemove(){
      api.delete(`orphanages/${params.id}`).then(()=>{
         alert('Orfanato removido com sucesso!')
         history.push('/orphanages');
      }).catch((error)=>{
         alert(`Não foi possível remover o orfanato ${error}`);
      })
   }

   return(
      <div id="page-remove-orphanage">
         <header>
            <h1>Excluir!</h1>
            <p>Tem certeza que quer excluir o {orphanage?.name}?</p>
            <button onClick={handleRemove}>
               Sim, desejo excluir.
            </button>
            <Link to="/orphanages"> Voltar </Link>
         </header>
         <img src={removeOrphanageImg} alt="Remover orfanato"/>
      </div>
   )
};

export default RemoveOrphanage;
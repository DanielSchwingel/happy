import React, { useState, useEffect } from 'react';
import CardOrphanage from '../components/CardOrphanage';

import SidebarDashboard from '../components/SidebarDashboard';
import api from '../services/api';
import noPendingImg from '../images/no-pending.svg';


import '../styles/pages/orphanages.css';

interface iOrphanage {
   id: number,
	name: string;
	latitude: number;
	longitude: number;
   pending: number;
}

const PendingOrphanages: React.FC = () => {
   const [orphanages, setOrphanages] = useState<iOrphanage[]>();

   useEffect(()=>{
      api.get('orphanages-pending').then( response =>{
			setOrphanages(response.data);
		}).catch(error=>alert(error));
   },[])

   return (
      <div id="page-orphanages">
         <SidebarDashboard />
         <main>
            <header>
               <h1>
                  Cadastros pendentes
               </h1>
               <span>
                  {orphanages?.length} orfanato(s)
               </span>
            </header>
            {orphanages?.length !== 0 ? (
            <div className="orphanages-content">
               {orphanages?.map(orphanage =>{
                  return (
                     <CardOrphanage 
                        key={orphanage.id}
                        id={orphanage.id} 
                        name={orphanage.name} 
                        latitude={orphanage.latitude} 
                        longitude={orphanage.longitude}
                        pending={orphanage.pending}
                     />
                  )
               })
               }
            </div>
            ) : (
               <div className="no-results">
                  <img src={noPendingImg} alt="Não há orfanatos pendentes"/>
                  <p>Nenhum no momento</p>
               </div>
            )}

         </main>
      </div>
   )
};

export default PendingOrphanages;
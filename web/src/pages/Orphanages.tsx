import React, { useState, useEffect } from 'react';
import CardOrphanage from '../components/CardOrphanage';

import SidebarDashboard from '../components/SidebarDashboard';
import api from '../services/api';

import '../styles/pages/orphanages.css';

interface iOrphanage {
   id: number,
	name: string;
	latitude: number;
	longitude: number;
   pending: number;
}

const Orphanages: React.FC = () => {
   const [orphanages, setOrphanages] = useState<iOrphanage[]>();

   useEffect(()=>{
      api.get('orphanages').then( response =>{
         setOrphanages(response.data);
		}).catch(error=>console.log(`aqui ${error}`));
   },[])

   return (
      <div id="page-orphanages">
         <SidebarDashboard />
         <main>
            <header>
               <h1>
                  Orfanatos Cadastrados
               </h1>
               <span>
                  {orphanages?.length} orfanato(s)
               </span>
            </header>
            
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
         </main>
      </div>
   )
};

export default Orphanages;
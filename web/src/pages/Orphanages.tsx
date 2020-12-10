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
	about: string;
	instructions: string;
	opening_hours: string;
	open_on_weekends: string;
	images: Array<{
		id: number;
		url: string;
	}>
}

const Orphanages: React.FC = () => {
   const [orphanages, setOrphanages] = useState<iOrphanage[]>();

   useEffect(()=>{
      api.get('dashboard').then( response =>{
			setOrphanages(response.data);
		}).catch(error=>alert(error));
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
                  {orphanages?.length} orfanatos
               </span>
            </header>
            <div className="orphanages-content">
               {orphanages?.map(orphanage =>{
                  return (
                     <CardOrphanage id={orphanage.id} name={orphanage.name} latitude={orphanage.latitude} longitude={orphanage.longitude} key={orphanage.id} />
                  )
               })
               }
            </div>

         </main>
      </div>
   )
};

export default Orphanages;
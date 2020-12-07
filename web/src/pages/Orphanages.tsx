import React from 'react';
import SidebarDashboard from '../components/SidebarDashboard';

import '../styles/pages/orphanages.css';

const Orphanages: React.FC = () => {
   return (
      <div id="page-orphanages">
         <SidebarDashboard />
         <main>
            <header>
               <h1>
                  Orfanatos Cadastrados
               </h1>
               <span>
                  2 orfanatos
               </span>
            </header>

         </main>
      </div>
   )
};

export default Orphanages;
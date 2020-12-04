import React from 'react';
import { FiPower, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/components/sidebar-dashboard.css';

export default function SidebarDashboard() {
   return(
		<aside className="app-sidebar-dashboard">
			<img src={mapMarkerImg} alt="Happy" />
         <div className="options">
            <NavLink exact to="/orphanages" activeClassName="option-selected">
               <FiMapPin size={24} color="#FFF" />
            </NavLink>
            <NavLink exact to="/" activeClassName="option-selected">
               <FiAlertCircle size={24} color="#FFF" />
            </NavLink>  
         </div>
			<footer>
				<button type="button" onClick={()=>{}}>
				   <FiPower size={24} color="#FFF" />
				</button>
			</footer>
		</aside>
   )
};
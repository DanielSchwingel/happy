import React from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link } from 'react-router-dom';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import mapIcon from "../utils/mapIcon";

import '../styles/components/card-orphanage.css';

interface iOrphanage {
   id: number,
	name: string;
	latitude: number;
	longitude: number;
	about?: string;
	instructions?: string;
	opening_hours?: string;
	open_on_weekends?: string;
	images?: Array<{
		id: number;
		url: string;
	}>
}

const CardOrphanage: React.FC<iOrphanage> = (props) =>{
   return(
      <div id="app-card-orphanage">
         <Map 
            center={[props.latitude, props.longitude]} 
            zoom={16} 
            style={{ width: '100%', height: 280 }}
            dragging={false}
            touchZoom={false}
            zoomControl={false}
            scrollWheelZoom={false}
            doubleClickZoom={false}
         >
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker interactive={false} icon={mapIcon} position={[props.latitude,props.longitude]} />
         </Map>

         <footer>
            <p>{props.name}</p>
            <div className="options">
               <Link to="">
                  <FiEdit3 size={24} color="#15C3D6" />
               </Link>
               <Link to={`/remove-orphanage/${props.id}`}>
                  <FiTrash size={24} color="#15C3D6" />
               </Link>
            </div>
         </footer>
      </div>
   )
};

export default CardOrphanage;
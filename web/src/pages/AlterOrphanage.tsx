import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { iOrphanage, iOrphanageParams } from '../interfaces/orphanage';

export default function AlterOrphanage() {
   const params = useParams<iOrphanageParams>();

	const history = useHistory();
	const [position, setPosition] = useState({latitude: 0, longitude: 0});

	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	const [instructions, setInstructions] = useState('');
	const [opening_hours, setOpeningHours] = useState('');
	const [open_on_weekends, setOpenOnWeekends] = useState(true);
	const [whatsapp, setWhatsapp] = useState(0);
	const [images, setImages] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);

	useEffect(()=> {
		api.get<iOrphanage>(`orphanages/${params.id}`)
			.then(response => {
				setName(response.data.name); 
				setAbout(response.data.about);
				setInstructions(response.data.instructions);
				setOpeningHours(response.data.opening_hours);
				setWhatsapp(response.data.whatsapp);
				setPosition({
					latitude: response.data.latitude,
					longitude: response.data.longitude
				});
				const imagesLoaded = response.data.images.map(image => {
					return image.url;
				}) 
				setPreviewImages(imagesLoaded);
			});
	},[params.id]);

   function handleMapClick(event: LeafletMouseEvent) {
		const { lat, lng } = event.latlng;
		setPosition({
			latitude: lat,
			longitude: lng
		})
   }

	function handleSelectImages(event: ChangeEvent<HTMLInputElement> ) {
		if (!event.target.files) {
			return;
		}
		const selectedImages = Array.from(event.target.files);
		if (images.length > 0) {
			images.map(image => selectedImages.push(image));
		}
		setImages(selectedImages);

		const selectedImagesPreview = selectedImages.map(image => {
			return URL.createObjectURL(image)
		})

		setPreviewImages(selectedImagesPreview);
	}

	async function handleSubmit(event: FormEvent){
		event.preventDefault();
		const { latitude, longitude } = position;
		
		const data = new FormData();

		data.append('name', name);
		data.append('about', about);
		data.append('latitude', String(latitude));
		data.append('longitude', String(longitude));
		data.append('instructions', instructions);
		data.append('opening_hours', opening_hours);
		data.append('open_on_weekends', String(open_on_weekends));
		data.append('whatsapp', String(whatsapp));

		images.forEach(image => {
			data.append('images', image);
			
		})
		console.log(images);
		
		await api.put(`/orphanages/${params.id}`, data);

		history.push('/confirm-orphanage');
	}
	  


	return (
		<div id="page-create-orphanage">
			<Sidebar/>
			<main>
				<form className="create-orphanage-form" onSubmit={handleSubmit}>
					<fieldset>
						<legend>Dados</legend>

						<Map 
							center={[position.latitude, position.longitude]} 
							style={{ width: '100%', height: 280 }}
							zoom={15}
							onclick={handleMapClick}
						>
							<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							{position.latitude !== 0 && (
								<Marker 
									interactive={false} 
									icon={mapIcon} 
									position={[position.latitude,position.longitude]} 
								/>
							)}
							
						</Map>

						<div className="input-block">
							<label htmlFor="name">Nome</label>
							<input 
								id="name"
								value={name}
								onChange={event => (setName(event.target.value))}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
							<textarea 
								id="about" 
								maxLength={300} 
								value={about}
								onChange={event => (setAbout(event.target.value))}
							/>
						</div>
						<div className="input-block">
							<label htmlFor="whatsapp">Número do Whatsapp</label>
							<input 
								id="whatsapp" 
								maxLength={300} 
								value={whatsapp}
								onChange={event => (setWhatsapp(Number(event.target.value)))}
							/>
						</div>

						<div className="input-block">
							<label htmlFor="images">Fotos</label>

							<div className="images-container">
								{previewImages.map(image =>{
									return(
										<img key={image} src={image} alt={name}/>
									)
								})}
								<label htmlFor='image[]' className="new-image">
									<FiPlus size={24} color="#15b6d6" />
								</label >
							</div>

							<input multiple onChange={handleSelectImages} type='file' id='image[]' />


						</div>
					</fieldset>

					<fieldset>
						<legend>Visitação</legend>

							<div className="input-block">
								<label htmlFor="instructions">Instruções</label>
								<textarea 
									id="instructions" 
									value={instructions}
									onChange={event => (setInstructions(event.target.value))}
								/>
							</div>

							<div className="input-block">
								<label htmlFor="opening_hours">Horário de atendimento</label>
								<input 
									id="opening_hours"
									value={opening_hours}
									onChange={event => (setOpeningHours(event.target.value))}
								/>
							</div>

							<div className="input-block">
								<label htmlFor="open_on_weekends">Atende fim de semana</label>

								<div className="button-select">
									<button 
										type="button" 
										className={open_on_weekends ? "active" : ""}
										onClick={()=>setOpenOnWeekends(true)}
									>
										Sim
									</button>
									<button 
										type="button"
										className={!open_on_weekends ? "active" : ""}
										onClick={()=>setOpenOnWeekends(false)}
									>
										Não
									</button>
								</div>
							</div>
				</fieldset>

				<button className="confirm-button" type="submit">
					Confirmar
				</button>
			</form>
			</main>
    </div>
  );
}


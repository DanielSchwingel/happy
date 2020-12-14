interface iOrphanage {
   name: string;
	latitude: number;
	longitude: number;
	about: string;
	instructions: string;
	opening_hours: string;
	open_on_weekends: string;
	whatsapp: number,
	images: Array<{
		id: number;
		url: string;
	}>
}

interface iOrphanageParams {
	id: string,
}

export type { iOrphanage, iOrphanageParams }
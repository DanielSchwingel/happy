import React from 'react';
import 'leaflet/dist/leaflet.css';
import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
	return (
		<AuthProvider>
			<Routes />
		</AuthProvider>
	);
}

export default App;

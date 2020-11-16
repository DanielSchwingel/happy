import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from './src/images/map-marker.png';

export default function App() {
	return (
		<View style={styles.container}>
			<MapView 
				provider={ PROVIDER_GOOGLE }
				style={styles.container}
				initialRegion={{
					latitude: -27.2343234,
					longitude: -52.0345924,
					latitudeDelta: 0.008,
					longitudeDelta: 0.008
				}}
			>
				<Marker
					icon={mapMarker}
					coordinate={{
						latitude: -27.2343234,
						longitude: -52.0345924,
					}}
				/>
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	}
});
